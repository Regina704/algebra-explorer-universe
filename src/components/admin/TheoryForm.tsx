
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateTheorySection, TheoryType } from '@/hooks/useTheory';
import { useToast } from '@/components/ui/use-toast';

interface TheoryFormData {
  title: string;
  content: string;
  section_type: TheoryType;
  order_index: number;
  is_published: boolean;
}

export function TheoryForm() {
  const [formData, setFormData] = useState<TheoryFormData>({
    title: '',
    content: '',
    section_type: 'definition',
    order_index: 0,
    is_published: true
  });

  const createTheorySection = useCreateTheorySection();
  const { toast } = useToast();

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

    try {
      await createTheorySection.mutateAsync(formData);
      toast({
        title: "Успех",
        description: "Теоретический раздел успешно создан"
      });
      setFormData({
        title: '',
        content: '',
        section_type: 'definition',
        order_index: 0,
        is_published: true
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать теоретический раздел",
        variant: "destructive"
      });
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

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Добавить теоретический раздел</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <label className="block text-sm font-medium mb-2">Порядок отображения</label>
            <Input
              type="number"
              value={formData.order_index}
              onChange={(e) => setFormData({...formData, order_index: parseInt(e.target.value) || 0})}
              min="0"
            />
          </div>
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

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="is_published"
            checked={formData.is_published}
            onChange={(e) => setFormData({...formData, is_published: e.target.checked})}
            className="rounded"
          />
          <label htmlFor="is_published" className="text-sm">Опубликовать сразу</label>
        </div>

        <Button 
          type="submit" 
          disabled={createTheorySection.isPending}
          className="w-full"
        >
          {createTheorySection.isPending ? 'Создание...' : 'Создать раздел'}
        </Button>
      </form>
    </div>
  );
}
