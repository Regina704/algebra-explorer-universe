
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheorySectionTypes } from '@/hooks/useTheorySectionTypes';

interface TypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function TypeSelector({ value, onChange }: TypeSelectorProps) {
  const { data: sectionTypes = [], isLoading } = useTheorySectionTypes();

  if (isLoading) {
    return (
      <div>
        <label className="block text-sm font-medium mb-2">Тип раздела *</label>
        <div className="h-10 bg-gray-100 rounded-md animate-pulse"></div>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-2">Тип раздела *</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Выберите тип раздела" />
        </SelectTrigger>
        <SelectContent>
          {sectionTypes.map((type) => (
            <SelectItem key={type.id} value={type.id}>
              <div className="flex items-center space-x-2">
                <span>{type.icon}</span>
                <span>{type.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
