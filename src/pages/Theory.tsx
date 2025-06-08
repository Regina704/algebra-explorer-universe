
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { useTheory } from '@/hooks/useTheory';
import { useTheorySectionTypes } from '@/hooks/useTheorySectionTypes';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const Theory = () => {
  const { data: theorySections = [], isLoading } = useTheory();
  const { data: sectionTypes = [] } = useTheorySectionTypes();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка теории...</p>
        </div>
      </div>
    );
  }

  // Фильтрация и сортировка
  const filteredSections = theorySections
    .filter(section => {
      const matchesSearch = section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           section.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || section.section_type_id === selectedType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.order_index - b.order_index;
      } else {
        return b.order_index - a.order_index;
      }
    });

  const getColorClasses = (colorClass: string) => {
    const colorMap = {
      blue: 'from-blue-500 to-blue-600 bg-blue-50 border-blue-200',
      green: 'from-green-500 to-green-600 bg-green-50 border-green-200',
      purple: 'from-purple-500 to-purple-600 bg-purple-50 border-purple-200',
      red: 'from-red-500 to-red-600 bg-red-50 border-red-200',
      yellow: 'from-yellow-500 to-yellow-600 bg-yellow-50 border-yellow-200',
      indigo: 'from-indigo-500 to-indigo-600 bg-indigo-50 border-indigo-200',
      pink: 'from-pink-500 to-pink-600 bg-pink-50 border-pink-200',
      gray: 'from-gray-500 to-gray-600 bg-gray-50 border-gray-200'
    };
    return colorMap[colorClass as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-indigo-600 hover:text-indigo-800 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">Теория множеств</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Введение */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Основы теории множеств
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Изучите фундаментальные понятия, обозначения и практические примеры 
              теории множеств — основы современной математики.
            </p>
          </div>

          {/* Фильтры и поиск */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Поиск по заголовку или содержанию..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все типы</SelectItem>
                    {sectionTypes.map(type => (
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

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="flex items-center gap-2"
              >
                {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                Порядок
              </Button>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Найдено разделов: {filteredSections.length}
            </div>
          </div>

          {/* Карточки разделов */}
          {filteredSections.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredSections.map((section) => {
                const sectionType = section.theory_section_types;
                const colorClasses = getColorClasses(sectionType?.color_class || 'blue');
                const [gradientClass, bgClass] = colorClasses.split(' bg-');
                
                return (
                  <div key={section.id} className={`bg-${bgClass} border-2 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow`}>
                    {/* Заголовок карточки */}
                    <div className={`bg-gradient-to-r ${gradientClass} text-white p-4`}>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{sectionType?.icon || '📖'}</span>
                        <div>
                          <h3 className="font-semibold text-lg">{section.title}</h3>
                          <span className="text-sm opacity-90">{sectionType?.label}</span>
                        </div>
                      </div>
                    </div>

                    {/* Содержимое карточки */}
                    <div className="p-6">
                      {section.image_url && (
                        <div className="mb-4">
                          <img 
                            src={section.image_url} 
                            alt={section.title}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      )}
                      
                      <div className="prose prose-sm max-w-none">
                        <p className="text-gray-700 leading-relaxed">
                          {section.content.length > 200 
                            ? `${section.content.substring(0, 200)}...` 
                            : section.content}
                        </p>
                      </div>

                      {section.content.length > 200 && (
                        <button className="mt-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                          Читать полностью
                        </button>
                      )}
                    </div>

                    {/* Футер карточки */}
                    <div className="px-6 pb-4">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Порядок: {section.order_index}</span>
                        <span>{new Date(section.created_at).toLocaleDateString('ru-RU')}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {searchTerm || selectedType !== 'all' 
                  ? 'Ничего не найдено' 
                  : 'Пока нет теоретических материалов'}
              </h3>
              <p className="text-gray-600">
                {searchTerm || selectedType !== 'all'
                  ? 'Попробуйте изменить критерии поиска или фильтры'
                  : 'Материалы будут добавлены администратором в ближайшее время.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Theory;
