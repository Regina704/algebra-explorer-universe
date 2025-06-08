
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCreateTheorySection } from '@/hooks/useTheory';
import { useTheorySectionTypes } from '@/hooks/useTheorySectionTypes';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { TypeSelector } from './theory/TypeSelector';
import { FormFields } from './theory/FormFields';
import { ImageUpload } from './theory/ImageUpload';

interface TheoryFormData {
  title: string;
  content: string;
  section_type_id: string;
  order_index: number;
  image_url?: string;
}

export function TheoryForm() {
  const { data: sectionTypes = [] } = useTheorySectionTypes();
  const [formData, setFormData] = useState<TheoryFormData>({
    title: '',
    content: '',
    section_type_id: sectionTypes[0]?.id || '',
    order_index: 0
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const createTheorySection = useCreateTheorySection();
  const { toast } = useToast();

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
    setFormData({ ...formData, image_url: undefined });
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
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.section_type_id) {
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

      await createTheorySection.mutateAsync({
        ...formData,
        image_url: imageUrl,
        is_published: true,
        section_type: 'definition' // Совместимость со старой схемой
      });

      toast({
        title: "Успех",
        description: "Теоретический раздел успешно создан"
      });

      // Сброс формы
      setFormData({
        title: '',
        content: '',
        section_type_id: sectionTypes[0]?.id || '',
        order_index: 0
      });
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать теоретический раздел",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Добавить теоретический раздел</h3>
      
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

        <Button 
          type="submit" 
          disabled={createTheorySection.isPending || uploading}
          className="w-full"
        >
          {uploading ? 'Загрузка...' : createTheorySection.isPending ? 'Создание...' : 'Создать раздел'}
        </Button>
      </form>
    </div>
  );
}
