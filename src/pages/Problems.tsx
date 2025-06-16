
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { useProblems } from '@/hooks/useProblems';

const Problems = () => {
  const [expandedSolution, setExpandedSolution] = useState<string | null>(null);
  const { data: problems = [], isLoading, error } = useProblems();

  const toggleSolution = (problemId: string) => {
    setExpandedSolution(expandedSolution === problemId ? null : problemId);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Легкая';
      case 'medium': return 'Средняя';
      case 'hard': return 'Сложная';
      default: return 'Неизвестно';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка задач...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Ошибка загрузки задач</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Попробовать снова
          </button>
        </div>
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
            <Brain className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-800">Задачи и решения</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Типовые задачи</h2>
          <p className="text-gray-600 text-lg">
            Решайте задачи на тему "Множество. Элемент множества" с подробными объяснениями каждого шага.
          </p>
        </div>

        {problems.length > 0 ? (
          <div className="space-y-6">
            {problems.map((problem, index) => (
              <div key={problem.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-semibold text-gray-500">Задача {index + 1}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(problem.difficulty)}`}>
                          {getDifficultyText(problem.difficulty)}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">{problem.title}</h3>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                    <p className="text-gray-700 whitespace-pre-line">{problem.problem_text}</p>
                  </div>

                  <button
                    onClick={() => toggleSolution(problem.id)}
                    className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {expandedSolution === problem.id ? (
                      <>
                        <ChevronUp className="w-5 h-5" />
                        <span>Скрыть решение</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-5 h-5" />
                        <span>Показать решение</span>
                      </>
                    )}
                  </button>

                  {expandedSolution === problem.id && problem.solution && problem.solution.length > 0 && (
                    <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-6 animate-fade-in">
                      <div className="flex items-center space-x-2 mb-4">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <h4 className="text-lg font-semibold text-green-800">Пошаговое решение:</h4>
                      </div>
                      <div className="space-y-3">
                        {problem.solution.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex space-x-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-green-200 text-green-800 rounded-full flex items-center justify-center text-sm font-semibold">
                              {stepIndex + 1}
                            </span>
                            <p className="text-gray-700 whitespace-pre-line">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Пока нет задач
            </h3>
            <p className="text-gray-600">
              Задачи будут добавлены администратором в ближайшее время.
            </p>
          </div>
        )}

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Готовы проверить знания?</h3>
          <p className="text-gray-600 mb-6">Перейдите к тестам, чтобы закрепить изученный материал</p>
          <Link
            to="/tests"
            className="inline-flex items-center space-x-2 bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <span>Перейти к тестам</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Problems;
