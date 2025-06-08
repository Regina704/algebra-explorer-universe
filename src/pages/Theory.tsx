
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Eye, FileText, Lightbulb } from 'lucide-react';
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

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'definition': return <BookOpen className="w-6 h-6" />;
      case 'notation': return <Eye className="w-6 h-6" />;
      case 'example': return <Lightbulb className="w-6 h-6" />;
      default: return <FileText className="w-6 h-6" />;
    }
  };

  const getSectionColor = (type: string) => {
    switch (type) {
      case 'definition': return 'from-blue-500 to-blue-600';
      case 'notation': return 'from-green-500 to-green-600';
      case 'example': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getSectionBgColor = (type: string) => {
    switch (type) {
      case 'definition': return 'bg-blue-50 border-blue-200';
      case 'notation': return 'bg-green-50 border-green-200';
      case 'example': return 'bg-purple-50 border-purple-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'definition': return 'Определение';
      case 'notation': return 'Обозначение';
      case 'example': return 'Пример';
      default: return type;
    }
  };

  // Группируем разделы по типу для лучшей организации
  const definitionSections = theorySections.filter(section => section.section_type === 'definition');
  const notationSections = theorySections.filter(section => section.section_type === 'notation');
  const exampleSections = theorySections.filter(section => section.section_type === 'example');

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
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Введение */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Основы теории множеств
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Изучите фундаментальные понятия, обозначения и практические примеры 
              теории множеств — основы современной математики.
            </p>
          </div>

          {/* Определения */}
          {definitionSections.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white`}>
                  <BookOpen className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Определения</h2>
              </div>
              
              {definitionSections.map((section) => (
                <div key={section.id} className={`${getSectionBgColor(section.section_type)} border-2 rounded-lg p-6`}>
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-r ${getSectionColor(section.section_type)} text-white`}>
                      {getSectionIcon(section.section_type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        {section.title}
                      </h3>
                      <div className="prose prose-blue max-w-none">
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                      {section.image_url && (
                        <div className="mt-4">
                          <img 
                            src={section.image_url} 
                            alt={section.title}
                            className="max-w-full h-auto rounded-lg shadow-md"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Обозначения */}
          {notationSections.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white`}>
                  <Eye className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Обозначения</h2>
              </div>
              
              {notationSections.map((section) => (
                <div key={section.id} className={`${getSectionBgColor(section.section_type)} border-2 rounded-lg p-6`}>
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-r ${getSectionColor(section.section_type)} text-white`}>
                      {getSectionIcon(section.section_type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        {section.title}
                      </h3>
                      <div className="prose prose-green max-w-none">
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                      {section.image_url && (
                        <div className="mt-4">
                          <img 
                            src={section.image_url} 
                            alt={section.title}
                            className="max-w-full h-auto rounded-lg shadow-md"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Примеры */}
          {exampleSections.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white`}>
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Примеры</h2>
              </div>
              
              {exampleSections.map((section) => (
                <div key={section.id} className={`${getSectionBgColor(section.section_type)} border-2 rounded-lg p-6`}>
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-r ${getSectionColor(section.section_type)} text-white`}>
                      {getSectionIcon(section.section_type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        {section.title}
                      </h3>
                      <div className="prose prose-purple max-w-none">
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                      {section.image_url && (
                        <div className="mt-4">
                          <img 
                            src={section.image_url} 
                            alt={section.title}
                            className="max-w-full h-auto rounded-lg shadow-md"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {theorySections.length === 0 && (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
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
