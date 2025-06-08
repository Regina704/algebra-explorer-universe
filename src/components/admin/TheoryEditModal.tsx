
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useUpdateTheorySection, TheorySection } from '@/hooks/useTheory';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { TypeSelector } from './theory/TypeSelector';
import { FormFields } from './theory/FormFields';
import { ImageUpload } from './theory/ImageUpload';

interface TheoryEditModalProps {
  section: TheorySection | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TheoryEditModal({ section, isOpen, onClose }: TheoryEditModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    section_type_id: '',
    order_index: 0,
    image_url: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const updateTheorySection = useUpdateTheorySection();
  const { toast } = useToast();

  useEffect(() => {
    if (section) {
      setFormData({
        title: section.title,
        content: section.content,
        section_type_id: section.section_type_id || '',
        order_index: section.order_index,
        image_url: section.image_url || ''
      });
      setImagePreview(section.image_url);
    }
  }, [section]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData({ ...formData, image_url: '' });
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `theory/${fileName}`;

      const { data, error } = await supabase.storage
        .from('theory-images')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('theory-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!section || !formData.title.trim() || !formData.content.trim()) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);

    try {
      let imageUrl = formData.image_url;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
        if (!imageUrl) {
          toast({
            title: "Ошибка",
            description: "Не удалось загрузить изображение",
            variant: "destructive"
          });
          setUploading(false);
          return;
        }
      }

      await updateTheorySection.mutateAsync({
        id: section.id,
        ...formData,
        image_url: imageUrl
      });

      toast({
        title: "Успех",
        description: "Раздел успешно обновлен"
      });

      onClose();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить раздел",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Редактировать раздел теории</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <TypeSelector 
            value={formData.section_type_id}
            onChange={(value: string) => setFormData({...formData, section_type_id: value})}
          />

          <FormFields
            title={formData.title}
            content={formData.content}
            sectionTypeId={formData.section_type_id}
            orderIndex={formData.order_index}
            onTitleChange={(value) => setFormData({...formData, title: value})}
            onContentChange={(value) => setFormData({...formData, content: value})}
            onOrderIndexChange={(value) => setFormData({...formData, order_index: value})}
          />

          <ImageUpload
            sectionTypeId={formData.section_type_id}
            imagePreview={imagePreview}
            onImageSelect={handleImageSelect}
            onRemoveImage={removeImage}
          />

          <div className="flex space-x-2">
            <Button 
              type="submit" 
              disabled={updateTheorySection.isPending || uploading}
            >
              {uploading ? 'Загрузка...' : updateTheorySection.isPending ? 'Обновление...' : 'Сохранить'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
