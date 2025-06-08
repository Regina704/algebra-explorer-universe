
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useUpdateHistorySection, HistorySection } from '@/hooks/useHistory';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Edit, Upload, X } from 'lucide-react';

interface HistoryEditModalProps {
  section: HistorySection;
  children: React.ReactNode;
}

export function HistoryEditModal({ section, children }: HistoryEditModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: section.title,
    content: section.content,
    image_url: section.image_url
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(section.image_url);
  const [uploading, setUploading] = useState(false);

  const updateSection = useUpdateHistorySection();
  const { toast } = useToast();

  useEffect(() => {
    setFormData({
      title: section.title,
      content: section.content,
      image_url: section.image_url
    });
    setImagePreview(section.image_url);
    setImageFile(null);
  }, [section, isOpen]);

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
    setFormData({ ...formData, image_url: null });
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `history/${fileName}`;

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
    
    if (!formData.title.trim() || !formData.content.trim()) {
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

      // Загружаем изображение если оно выбрано
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

      await updateSection.mutateAsync({
        id: section.id,
        ...formData,
        image_url: imageUrl,
        updated_at: new Date().toISOString()
      });

      toast({
        title: "Успех",
        description: "Раздел успешно обновлен"
      });

      setIsOpen(false);
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Edit className="w-5 h-5" />
            <span>Редактировать раздел</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Заголовок *</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Заголовок раздела"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Содержание *</label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="Содержание раздела"
              rows={8}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Изображение</label>
            
            {imagePreview ? (
              <div className="relative mb-4">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="max-w-xs h-auto rounded-lg border"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                >
                  Выберите изображение
                </label>
                <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF до 5MB</p>
              </div>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <Button 
              type="submit" 
              disabled={updateSection.isPending || uploading}
              className="flex-1"
            >
              {uploading ? 'Загрузка...' : updateSection.isPending ? 'Сохранение...' : 'Сохранить'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Отмена
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
