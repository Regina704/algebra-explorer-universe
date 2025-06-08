
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TheoryType } from '@/hooks/useTheory';

interface TypeSelectorProps {
  value: TheoryType;
  onChange: (value: TheoryType) => void;
}

export function TypeSelector({ value, onChange }: TypeSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Тип раздела *</label>
      <Select value={value} onValueChange={onChange}>
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
  );
}
