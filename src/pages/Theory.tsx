
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { useTheory } from '@/hooks/useTheory';

const Theory = () => {
  const { data: theorySections = [], isLoading } = useTheory();

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

  // Сортируем разделы по order_index
  const sortedSections = [...theorySections].sort((a, b) => a.order_index - b.order_index);

  // Цветовые схемы для разных типов
  const getColorClasses = (colorClass: string) => {
    const colorMap: Record<string, { bg: string; border: string; text: string; icon: string }> = {
      blue: { 
        bg: 'bg-blue-50', 
        border: 'border-blue-200', 
        text: 'text-blue-800',
        icon: 'text-blue-600'
      },
      green: { 
        bg: 'bg-green-50', 
        border: 'border-green-200', 
        text: 'text-green-800',
        icon: 'text-green-600'
      },
      purple: { 
        bg: 'bg-purple-50', 
        border: 'border-purple-200', 
        text: 'text-purple-800',
        icon: 'text-purple-600'
      },
      red: { 
        bg: 'bg-red-50', 
        border: 'border-red-200', 
        text: 'text-red-800',
        icon: 'text-red-600'
      },
      yellow: { 
        bg: 'bg-yellow-50', 
        border: 'border-yellow-200', 
        text: 'text-yellow-800',
        icon: 'text-yellow-600'
      },
      indigo: { 
        bg: 'bg-indigo-50', 
        border: 'border-indigo-200', 
        text: 'text-indigo-800',
        icon: 'text-indigo-600'
      }
    };
    
    return colorMap[colorClass] || colorMap.blue;
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
        <div className="max-w-4xl mx-auto">
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

          {/* Список разделов */}
          {sortedSections.length > 0 ? (
            <div className="space-y-6">
              {sortedSections.map((section) => {
                const sectionType = section.theory_section_types;
                const colors = getColorClasses(sectionType?.color_class || 'blue');
                
                return (
                  <div 
                    key={section.id} 
                    className={`${colors.bg} ${colors.border} border-l-4 rounded-lg shadow-sm overflow-hidden`}
                  >
                    {/* Заголовок раздела */}
                    <div className="bg-white p-4 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        {sectionType?.icon && (
                          <span className={`text-xl ${colors.icon}`}>
                            {sectionType.icon}
                          </span>
                        )}
                        <h3 className={`text-lg font-semibold ${colors.text}`}>
                          {section.title}
                        </h3>
                        {sectionType?.label && (
                          <span className={`text-sm px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                            {sectionType.label}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Содержимое раздела */}
                    <div className="p-6 bg-white">
                      {section.image_url && (
                        <div className="mb-6">
                          <img 
                            src={section.image_url} 
                            alt={section.title}
                            className="w-full max-w-md mx-auto rounded-lg shadow-md"
                          />
                        </div>
                      )}
                      
                      <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {section.content}
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-500 text-right">
                          {new Date(section.created_at).toLocaleDateString('ru-RU')}
                        </div>
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
                Пока нет теоретических материалов
              </h3>
              <p className="text-gray-600">
                Материалы будут добавлены администратором в ближайшее время.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Theory;
