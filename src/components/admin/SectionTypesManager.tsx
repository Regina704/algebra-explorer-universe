
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTheorySectionTypes, useCreateTheorySectionType, useDeleteTheorySectionType } from '@/hooks/useTheorySectionTypes';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Trash2 } from 'lucide-react';

export function SectionTypesManager() {
  const [isAdding, setIsAdding] = useState(false);
  const [newType, setNewType] = useState({
    name: '',
    label: '',
    description: '',
    icon: '📖',
    color_class: 'blue'
  });

  const { data: sectionTypes = [] } = useTheorySectionTypes();
  const createSectionType = useCreateTheorySectionType();
  const deleteSectionType = useDeleteTheorySectionType();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newType.name.trim() || !newType.label.trim()) {
      toast({
        title: "Ошибка",
        description: "Заполните обязательные поля",
        variant: "destructive"
      });
      return;
    }

    try {
      await createSectionType.mutateAsync(newType);
      toast({
        title: "Успех",
        description: "Тип раздела успешно создан"
      });
      setNewType({
        name: '',
        label: '',
        description: '',
        icon: '📖',
        color_class: 'blue'
      });
      setIsAdding(false);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать тип раздела",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string, label: string) => {
    if (confirm(`Вы уверены, что хотите удалить тип "${label}"?`)) {
      try {
        await deleteSectionType.mutateAsync(id);
        toast({
          title: "Успех",
          description: "Тип раздела успешно удален"
        });
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось удалить тип раздела",
          variant: "destructive"
        });
      }
    }
  };

  const colorOptions = [
    { value: 'blue', label: 'Синий' },
    { value: 'green', label: 'Зеленый' },
    { value: 'purple', label: 'Фиолетовый' },
    { value: 'red', label: 'Красный' },
    { value: 'yellow', label: 'Желтый' },
    { value: 'indigo', label: 'Индиго' },
    { value: 'pink', label: 'Розовый' },
    { value: 'gray', label: 'Серый' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Управление типами разделов</h3>
        <Button onClick={() => setIsAdding(true)} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Добавить тип</span>
        </Button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Системное имя *</label>
              <Input
                value={newType.name}
                onChange={(e) => setNewType({...newType, name: e.target.value})}
                placeholder="например: custom_type"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Отображаемое название *</label>
              <Input
                value={newType.label}
                onChange={(e) => setNewType({...newType, label: e.target.value})}
                placeholder="например: Пользовательский тип"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Описание</label>
            <Textarea
              value={newType.description}
              onChange={(e) => setNewType({...newType, description: e.target.value})}
              placeholder="Описание типа раздела"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Иконка</label>
              <Input
                value={newType.icon}
                onChange={(e) => setNewType({...newType, icon: e.target.value})}
                placeholder="📖"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Цвет</label>
              <select
                value={newType.color_class}
                onChange={(e) => setNewType({...newType, color_class: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {colorOptions.map(color => (
                  <option key={color.value} value={color.value}>{color.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button type="submit" disabled={createSectionType.isPending}>
              {createSectionType.isPending ? 'Создание...' : 'Создать'}
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
              Отмена
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {sectionTypes.map(type => (
          <div key={type.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{type.icon}</span>
              <div>
                <h4 className="font-medium">{type.label}</h4>
                <p className="text-sm text-gray-500">{type.description}</p>
                <span className="text-xs text-gray-400">ID: {type.name}</span>
              </div>
            </div>
            <Button
              onClick={() => handleDelete(type.id, type.label)}
              variant="outline"
              size="sm"
              className="text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
