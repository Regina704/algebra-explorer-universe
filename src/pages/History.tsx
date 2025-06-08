
import { Link } from 'react-router-dom';
import { ArrowLeft, History as HistoryIcon, User, Calendar, Lightbulb, Edit } from 'lucide-react';
import { useHistory } from '@/hooks/useHistory';
import { useAuth } from '@/hooks/useAuth';
import { HistoryEditModal } from '@/components/admin/HistoryEditModal';

const History = () => {
  const { data: historySections = [], isLoading } = useHistory();
  const { isAdmin } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка истории...</p>
        </div>
      </div>
    );
  }

  const getSectionByType = (type: string) => {
    return historySections.find(section => section.section_type === type);
  };

  const introSection = getSectionByType('intro');
  const creatorSection = getSectionByType('creator');
  const developmentSection = getSectionByType('development');
  const modernSection = getSectionByType('modern');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-indigo-600 hover:text-indigo-800 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <HistoryIcon className="w-8 h-8 text-orange-600" />
            <h1 className="text-2xl font-bold text-gray-800">История теории множеств</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          {introSection && (
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8 relative">
              {isAdmin && (
                <HistoryEditModal section={introSection}>
                  <button className="absolute top-4 right-4 p-2 text-gray-500 hover:text-indigo-600 transition-colors">
                    <Edit className="w-5 h-5" />
                  </button>
                </HistoryEditModal>
              )}
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                {introSection.title}
              </h2>
              <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto whitespace-pre-line">
                {introSection.content}
              </p>
              {introSection.image_url && (
                <div className="mt-6 flex justify-center">
                  <img 
                    src={introSection.image_url} 
                    alt={introSection.title}
                    className="max-w-md h-auto rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          )}

          <div className="space-y-8">
            {/* Georg Cantor */}
            {creatorSection && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
                {isAdmin && (
                  <HistoryEditModal section={creatorSection}>
                    <button className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-indigo-600 transition-colors bg-white rounded-full shadow-md">
                      <Edit className="w-5 h-5" />
                    </button>
                  </HistoryEditModal>
                )}
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-indigo-600 p-8 text-white">
                    <div className="text-center">
                      {creatorSection.image_url ? (
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white border-opacity-20">
                          <img 
                            src={creatorSection.image_url} 
                            alt="Георг Кантор" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <User className="w-12 h-12" />
                        </div>
                      )}
                      <h3 className="text-2xl font-bold mb-2">Георг Кантор</h3>
                      <div className="flex items-center justify-center space-x-2 mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>1845-1918</span>
                      </div>
                      <p className="text-sm opacity-90">Основатель теории множеств</p>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">{creatorSection.title}</h4>
                    <div className="space-y-4 text-gray-600">
                      <div className="whitespace-pre-line">
                        {creatorSection.content}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Development Timeline */}
            {developmentSection && (
              <div className="bg-white rounded-lg shadow-lg p-8 relative">
                {isAdmin && (
                  <HistoryEditModal section={developmentSection}>
                    <button className="absolute top-4 right-4 p-2 text-gray-500 hover:text-indigo-600 transition-colors">
                      <Edit className="w-5 h-5" />
                    </button>
                  </HistoryEditModal>
                )}
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Calendar className="w-6 h-6 mr-3 text-orange-600" />
                  {developmentSection.title}
                </h3>
                
                <div className="prose prose-gray max-w-none">
                  <div className="whitespace-pre-line text-gray-600">
                    {developmentSection.content}
                  </div>
                </div>
                
                {developmentSection.image_url && (
                  <div className="mt-6">
                    <img 
                      src={developmentSection.image_url} 
                      alt={developmentSection.title}
                      className="max-w-full h-auto rounded-lg shadow-md mx-auto"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Modern Applications */}
            {modernSection && (
              <div className="bg-white rounded-lg shadow-lg p-8 relative">
                {isAdmin && (
                  <HistoryEditModal section={modernSection}>
                    <button className="absolute top-4 right-4 p-2 text-gray-500 hover:text-indigo-600 transition-colors">
                      <Edit className="w-5 h-5" />
                    </button>
                  </HistoryEditModal>
                )}
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Lightbulb className="w-6 h-6 mr-3 text-yellow-600" />
                  {modernSection.title}
                </h3>
                
                <div className="prose prose-gray max-w-none">
                  <div className="whitespace-pre-line text-gray-600">
                    {modernSection.content}
                  </div>
                </div>
                
                {modernSection.image_url && (
                  <div className="mt-6">
                    <img 
                      src={modernSection.image_url} 
                      alt={modernSection.title}
                      className="max-w-full h-auto rounded-lg shadow-md mx-auto"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Quote */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-8 text-white text-center">
              <blockquote className="text-xl italic mb-4">
                "В математике искусство ставить вопросы важнее, чем искусство их решать."
              </blockquote>
              <footer className="text-indigo-200">— Георг Кантор</footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
