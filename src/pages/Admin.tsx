import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Settings, User, LogOut, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheory, useDeleteTheorySection } from '@/hooks/useTheory';
import { useTests } from '@/hooks/useTests';
import { useDeleteTest } from '@/hooks/useTestsAdmin';
import { useProblems } from '@/hooks/useProblems';
import { useDeleteProblem } from '@/hooks/useProblemsAdmin';
import { TheoryForm } from '@/components/admin/TheoryForm';
import { TheoryEditModal } from '@/components/admin/TheoryEditModal';
import { ProblemEditModal } from '@/components/admin/ProblemEditModal';
import { SectionTypesManager } from '@/components/admin/SectionTypesManager';
import { TestForm } from '@/components/admin/TestForm';
import ProblemForm from '@/components/admin/ProblemForm';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Admin = () => {
  const { user, profile, signOut, isAdmin } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [editingTheory, setEditingTheory] = useState(null);
  const [editingProblem, setEditingProblem] = useState(null);
  const { data: theoryData = [] } = useTheory();
  const { data: testsData = [] } = useTests();
  const { data: problemsData = [] } = useProblems();
  const deleteTheorySection = useDeleteTheorySection();
  const deleteTest = useDeleteTest();
  const deleteProblem = useDeleteProblem();
  const { toast } = useToast();

  // Если пользователь не админ, показываем сообщение об ошибке
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Доступ запрещён</h2>
          <p className="text-gray-600 mb-6">У вас нет прав доступа к админ-панели</p>
          <Link to="/" className="text-indigo-600 hover:text-indigo-800 transition-colors">
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  const handleDeleteTheory = async (id: string, title: string) => {
    if (confirm(`Вы уверены, что хотите удалить раздел "${title}"?`)) {
      try {
        await deleteTheorySection.mutateAsync(id);
        toast({
          title: "Успех",
          description: "Раздел успешно удален"
        });
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось удалить раздел",
          variant: "destructive"
        });
      }
    }
  };

  const handleDeleteTest = async (id: string, title: string) => {
    if (confirm(`Вы уверены, что хотите удалить тест "${title}"?`)) {
      try {
        await deleteTest.mutateAsync(id);
        toast({
          title: "Успех",
          description: "Тест успешно удален"
        });
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось удалить тест",
          variant: "destructive"
        });
      }
    }
  };

  const handleDeleteProblem = async (id: string, title: string) => {
    if (confirm(`Вы уверены, что хотите удалить задачу "${title}"?`)) {
      try {
        await deleteProblem.mutateAsync(id);
        toast({
          title: "Успех",
          description: "Задача успешно удалена"
        });
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось удалить задачу",
          variant: "destructive"
        });
      }
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Легкая';
      case 'medium': return 'Средняя';
      case 'hard': return 'Сложная';
      default: return difficulty;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <Settings className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-800">Админ-панель</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {profile?.full_name || profile?.email}
              </span>
              <Button
                onClick={signOut}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Выйти</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Разделы</h3>
              <nav className="space-y-2">
                {[
                  { id: 'overview', title: 'Обзор', icon: '📊' },
                  { id: 'theory', title: 'Теория', icon: '📖' },
                  { id: 'problems', title: 'Задачи', icon: '🧮' },
                  { id: 'tests', title: 'Тесты', icon: '📝' },
                  { id: 'section-types', title: 'Типы разделов', icon: '🏷️' },
                  { id: 'add-theory', title: 'Добавить теорию', icon: '➕' },
                  { id: 'add-problem', title: 'Добавить задачу', icon: '🔢' },
                  { id: 'add-test', title: 'Добавить тест', icon: '✏️' },
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{section.icon}</span>
                    <span>{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {activeSection === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Обзор системы</h2>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-50 p-6 rounded-lg text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {theoryData.length}
                      </div>
                      <div className="text-blue-800">Теоретических разделов</div>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {problemsData.length}
                      </div>
                      <div className="text-green-800">Задач</div>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-lg text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        {testsData.length}
                      </div>
                      <div className="text-purple-800">Тестов</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'theory' && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Управление теорией</h2>
                
                <div className="space-y-4">
                  {theoryData.map(item => (
                    <div key={item.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{item.theory_section_types?.icon || '📖'}</span>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                            <span className="text-sm text-gray-500">{item.theory_section_types?.label}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingTheory(item)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTheory(item.id, item.title)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{item.content.slice(0, 150)}...</p>
                      <p className="text-sm text-gray-500">Порядок: {item.order_index}</p>
                    </div>
                  ))}
                  {theoryData.length === 0 && (
                    <p className="text-center text-gray-500 py-8">Пока нет теоретических разделов</p>
                  )}
                </div>
              </div>
            )}

            {activeSection === 'problems' && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Управление задачами</h2>
                
                <div className="space-y-4">
                  {problemsData.map(problem => (
                    <div key={problem.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(problem.difficulty)}`}>
                            {getDifficultyLabel(problem.difficulty)}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-800">{problem.title}</h3>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingProblem(problem)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProblem(problem.id, problem.title)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{problem.problem_text.slice(0, 150)}...</p>
                      <p className="text-sm text-gray-500">
                        Шагов решения: {problem.solution.length}
                      </p>
                    </div>
                  ))}
                  {problemsData.length === 0 && (
                    <p className="text-center text-gray-500 py-8">Пока нет задач</p>
                  )}
                </div>
              </div>
            )}

            {activeSection === 'tests' && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Управление тестами</h2>
                
                <div className="space-y-4">
                  {testsData.map(test => (
                    <div key={test.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{test.title}</h3>
                          {test.description && (
                            <p className="text-gray-600 mt-1">{test.description}</p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTest(test.id, test.title)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Вопросов: {test.questions.length}</span>
                        {test.time_limit && <span>Время: {test.time_limit} мин</span>}
                      </div>
                    </div>
                  ))}
                  {testsData.length === 0 && (
                    <p className="text-center text-gray-500 py-8">Пока нет тестов</p>
                  )}
                </div>
              </div>
            )}

            {activeSection === 'section-types' && <SectionTypesManager />}

            {activeSection === 'add-theory' && <TheoryForm />}

            {activeSection === 'add-problem' && <ProblemForm />}

            {activeSection === 'add-test' && <TestForm />}
          </div>
        </div>
      </div>

      {/* Модальные окна */}
      <TheoryEditModal
        section={editingTheory}
        isOpen={!!editingTheory}
        onClose={() => setEditingTheory(null)}
      />

      <ProblemEditModal
        problem={editingProblem}
        isOpen={!!editingProblem}
        onClose={() => setEditingProblem(null)}
      />
    </div>
  );
};

export default Admin;
