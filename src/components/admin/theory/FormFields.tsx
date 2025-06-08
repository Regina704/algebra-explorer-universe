
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TheoryType } from '@/hooks/useTheory';

interface FormFieldsProps {
  title: string;
  content: string;
  sectionType: TheoryType;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
}

export function FormFields({ title, content, sectionType, onTitleChange, onContentChange }: FormFieldsProps) {
  const getTypeLabel = (type: TheoryType) => {
    switch (type) {
      case 'definition': return 'Определение';
      case 'notation': return 'Обозначение';
      case 'example': return 'Пример';
    }
  };

  const getPlaceholder = () => {
    switch (sectionType) {
      case 'definition':
        return 'Введите определение понятия. Например: "Множество — это совокупность определённых и различимых между собой объектов..."';
      case 'notation':
        return 'Введите математические обозначения. Например: "∈ — принадлежит, ∉ — не принадлежит..."';
      case 'example':
        return 'Приведите конкретный пример. Например: "Рассмотрим множество однозначных цифр: A = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}..."';
    }
  };

  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-2">Заголовок *</label>
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder={`Заголовок для ${getTypeLabel(sectionType).toLowerCase()}`}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Содержание *</label>
        <Textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder={getPlaceholder()}
          rows={6}
          required
        />
      </div>
    </>
  );
}
