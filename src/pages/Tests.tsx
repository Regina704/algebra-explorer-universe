
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, FileText, Play } from 'lucide-react';
import { useTests } from '@/hooks/useTests';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Tests = () => {
  const { data: tests = [], isLoading, error } = useTests();
  const [selectedTestType, setSelectedTestType] = useState<'all' | 'theory' | 'practice'>('all');

  // Фильтруем тесты по типу
  const filteredTests = tests.filter(test => {
    if (selectedTestType === 'all') return true;
    return test.test_type === selectedTestType;
  });

  const getTestTypeLabel = (type: string) => {
    switch (type) {
      case 'theory': return 'Теория';
      case 'practice': return 'Практика';
      default: return type;
    }
  };

  const getTestTypeColor = (type: string) => {
    switch (type) {
      case 'theory': return 'bg-blue-100 text-blue-800';
      case 'practice': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Загрузка тестов...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-lg text-red-600">Ошибка загрузки тестов</div>
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
            <h1 className="text-2xl font-bold text-gray-800">Тестирование</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Доступные тесты</h2>
            
            <div className="w-64">
              <Select value={selectedTestType} onValueChange={(value: any) => setSelectedTestType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип теста" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все тесты</SelectItem>
                  <SelectItem value="theory">Теория</SelectItem>
                  <SelectItem value="practice">Практика</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredTests.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <FileText className="w-16 h-16 mx-auto mb-4" />
              </div>
              <p className="text-gray-600 text-lg mb-2">
                {selectedTestType === 'all' ? 'Пока нет доступных тестов' : `Нет тестов типа "${getTestTypeLabel(selectedTestType)}"`}
              </p>
              <p className="text-gray-500">Тесты будут добавлены позже</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests.map((test) => (
                <div key={test.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{test.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ml-2 ${getTestTypeColor(test.test_type)}`}>
                      {getTestTypeLabel(test.test_type)}
                    </span>
                  </div>
                  
                  {test.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{test.description}</p>
                  )}
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <FileText className="w-4 h-4 mr-2" />
                      <span>Вопросов: {test.questions.length}</span>
                    </div>
                    {test.time_limit && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Время: {test.time_limit} мин</span>
                      </div>
                    )}
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    <Play className="w-4 h-4 mr-2" />
                    Начать тест
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tests;
