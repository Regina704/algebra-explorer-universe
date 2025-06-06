
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Circle, Lightbulb } from 'lucide-react';
import { useTheory } from '@/hooks/useTheory';

const Theory = () => {
  const [activeSection, setActiveSection] = useState<'definition' | 'notation' | 'example'>('definition');
  const { data: theoryData = [], isLoading, error } = useTheory();

  const sections = [
    { id: 'definition', title: 'Определения', icon: BookOpen },
    { id: 'notation', title: 'Обозначения', icon: Circle },
    { id: 'example', title: 'Примеры', icon: Lightbulb },
  ];

  // Фильтруем данные по типу и сортируем по алфавиту
  const filteredData = theoryData
    .filter(item => item.section_type === activeSection)
    .sort((a, b) => a.title.localeCompare(b.title));

  const getSectionTitle = (type: string) => {
    switch (type) {
      case 'definition': return 'Определения';
      case 'notation': return 'Обозначения';
      case 'example': return 'Примеры';
      default: return '';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-lg text-red-600">Ошибка загрузки данных</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-indigo-600 hover:text-indigo-800 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Теоретические сведения</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Содержание</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                    <span>{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">{getSectionTitle(activeSection)}</h2>
                
                {filteredData.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <BookOpen className="w-16 h-16 mx-auto mb-4" />
                    </div>
                    <p className="text-gray-600 text-lg mb-2">Пока нет данных в этом разделе</p>
                    <p className="text-gray-500">Материалы будут добавлены позже</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {filteredData.map((item) => (
                      <div key={item.id} className="border-l-4 border-indigo-500 pl-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                        <div className="text-gray-600 mb-4 whitespace-pre-wrap">{item.content}</div>
                        
                        {item.image_url && (
                          <div className="mt-4">
                            <img 
                              src={item.image_url} 
                              alt={item.title}
                              className="max-w-full h-auto rounded-lg shadow-md"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Theory;
