
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateTheorySection, TheoryType } from '@/hooks/useTheory';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, X } from 'lucide-react';

interface TheoryFormData {
  title: string;
  content: string;
  section_type: TheoryType;
  image_url?: string;
}

export function TheoryForm() {
  const [formData, setFormData] = useState<TheoryFormData>({
    title: '',
    content: '',
    section_type: 'definition'
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

      await createTheorySection.mutateAsync({
        ...formData,
        image_url: imageUrl,
        order_index: 0,
        is_published: true
      });

      toast({
        title: "Успех",
        description: "Теоретический раздел успешно создан"
      });

      // Сброс формы
      setFormData({
        title: '',
        content: '',
        section_type: 'definition'
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

  const getTypeLabel = (type: TheoryType) => {
    switch (type) {
      case 'definition': return 'Определение';
      case 'notation': return 'Обозначение';
      case 'example': return 'Пример';
    }
  };

  const getPlaceholder = () => {
    switch (formData.section_type) {
      case 'definition':
        return 'Введите определение понятия. Например: "Множество — это совокупность определённых и различимых между собой объектов..."';
      case 'notation':
        return 'Введите математические обозначения. Например: "∈ — принадлежит, ∉ — не принадлежит..."';
      case 'example':
        return 'Приведите конкретный пример. Например: "Рассмотрим множество однозначных цифр: A = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}..."';
    }
  };

  const getImageHelpText = () => {
    switch (formData.section_type) {
      case 'definition':
        return 'Изображение для иллюстрации определения (диаграммы, схемы)';
      case 'notation':
        return 'Изображение с математическими обозначениями';
      case 'example':
        return 'Изображение для наглядного примера (графики, диаграммы)';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Добавить теоретический раздел</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Тип раздела *</label>
          <Select 
            value={formData.section_type} 
            onValueChange={(value: TheoryType) => setFormData({...formData, section_type: value})}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="definition">Определение</SelectItem>
              <SelectItem value="notation">Обозначение</SelectItem>
              <SelectItem value="example">Пример</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Заголовок *</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder={`Заголовок для ${getTypeLabel(formData.section_type).toLowerCase()}`}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Содержание *</label>
          <Textarea
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            placeholder={getPlaceholder()}
            rows={6}
            required
          />
        </div>

        {/* Поле для изображений для всех типов */}
        <div>
          <label className="block text-sm font-medium mb-2">Изображение</label>
          <p className="text-xs text-gray-500 mb-3">{getImageHelpText()}</p>
          
          {imagePreview ? (
            <div className="relative">
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
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
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
