
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTheorySectionTypes } from '@/hooks/useTheorySectionTypes';

interface FormFieldsProps {
  title: string;
  content: string;
  sectionTypeId: string;
  orderIndex: number;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onOrderIndexChange: (value: number) => void;
}

export function FormFields({ 
  title, 
  content, 
  sectionTypeId, 
  orderIndex,
  onTitleChange, 
  onContentChange,
  onOrderIndexChange 
}: FormFieldsProps) {
  const { data: sectionTypes = [] } = useTheorySectionTypes();
  
  const selectedType = sectionTypes.find(type => type.id === sectionTypeId);

  const getPlaceholder = () => {
    if (!selectedType) return 'Введите содержание раздела';
    
    switch (selectedType.name) {
      case 'definition':
        return 'Введите определение понятия. Например: "Множество — это совокупность определённых и различимых между собой объектов..."';
      case 'notation':
        return 'Введите математические обозначения. Например: "∈ — принадлежит, ∉ — не принадлежит..."';
      case 'example':
        return 'Приведите конкретный пример. Например: "Рассмотрим множество однозначных цифр: A = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}..."';
      case 'theorem':
        return 'Введите формулировку теоремы и её доказательство...';
      case 'axiom':
        return 'Введите формулировку аксиомы...';
      case 'property':
        return 'Опишите свойство и его характеристики...';
      default:
        return 'Введите содержание раздела';
    }
  };

  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-2">Заголовок *</label>
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder={`Заголовок для ${selectedType?.label?.toLowerCase() || 'раздела'}`}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Порядок отображения *</label>
        <Input
          type="number"
          value={orderIndex}
          onChange={(e) => onOrderIndexChange(parseInt(e.target.value) || 0)}
          placeholder="Порядок (0, 1, 2...)"
          min="0"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Чем меньше число, тем выше в списке</p>
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
