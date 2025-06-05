
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

interface Problem {
  id: number;
  title: string;
  problem: string;
  solution: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

const Problems = () => {
  const [expandedSolution, setExpandedSolution] = useState<number | null>(null);

  const problems: Problem[] = [
    {
      id: 1,
      title: "Принадлежность элементов множеству",
      problem: "Дано множество A = {2, 4, 6, 8, 10}. Определите, какие из следующих утверждений верны: а) 4 ∈ A; б) 5 ∈ A; в) 10 ∈ A; г) 12 ∈ A.",
      solution: [
        "Рассмотрим каждое утверждение:",
        "а) 4 ∈ A — ВЕРНО, так как 4 есть в множестве A",
        "б) 5 ∈ A — НЕВЕРНО, так как 5 отсутствует в множестве A",
        "в) 10 ∈ A — ВЕРНО, так как 10 есть в множестве A",
        "г) 12 ∈ A — НЕВЕРНО, так как 12 отсутствует в множестве A",
        "Ответ: верными являются утверждения а) и в)"
      ],
      difficulty: 'easy'
    },
    {
      id: 2,
      title: "Способы задания множеств",
      problem: "Запишите множество B = {x | x — натуральное число, 3 < x ≤ 8} перечислением элементов.",
      solution: [
        "Нужно найти все натуральные числа x, которые больше 3 и меньше или равны 8",
        "Натуральные числа: 1, 2, 3, 4, 5, 6, 7, 8, 9, ...",
        "Условие: 3 < x ≤ 8",
        "Числа больше 3: 4, 5, 6, 7, 8, 9, ...",
        "Из них числа не больше 8: 4, 5, 6, 7, 8",
        "Ответ: B = {4, 5, 6, 7, 8}"
      ],
      difficulty: 'easy'
    },
    {
      id: 3,
      title: "Подмножества",
      problem: "Для множества C = {1, 2} найдите все его подмножества и укажите их количество.",
      solution: [
        "Подмножество — это множество, все элементы которого принадлежат исходному множеству",
        "Для множества C = {1, 2} подмножествами являются:",
        "1) ∅ (пустое множество) — не содержит элементов",
        "2) {1} — содержит только элемент 1",
        "3) {2} — содержит только элемент 2", 
        "4) {1, 2} — содержит все элементы (само множество C)",
        "Количество подмножеств = 2ⁿ = 2² = 4, где n — количество элементов",
        "Ответ: ∅, {1}, {2}, {1, 2}. Всего: 4 подмножества"
      ],
      difficulty: 'medium'
    },
    {
      id: 4,
      title: "Равенство множеств",
      problem: "Определите, равны ли множества: A = {x | x² = 4} и B = {-2, 2}.",
      solution: [
        "Два множества равны, если они содержат одинаковые элементы",
        "Найдём множество A = {x | x² = 4}:",
        "Нужно решить уравнение x² = 4",
        "x² = 4",
        "x = ±2",
        "Значит, x = 2 или x = -2",
        "Поэтому A = {-2, 2}",
        "Множество B = {-2, 2}",
        "Сравним: A = {-2, 2} и B = {-2, 2}",
        "Ответ: Да, множества A и B равны"
      ],
      difficulty: 'medium'
    },
    {
      id: 5,
      title: "Пересечение множеств",
      problem: "Найдите пересечение множеств A = {1, 2, 3, 4, 5} и B = {3, 4, 5, 6, 7}.",
      solution: [
        "Пересечение множеств A ∩ B — это множество элементов, принадлежащих одновременно и A, и B",
        "A = {1, 2, 3, 4, 5}",
        "B = {3, 4, 5, 6, 7}",
        "Найдём элементы, которые есть в обоих множествах:",
        "1 ∈ A, но 1 ∉ B",
        "2 ∈ A, но 2 ∉ B", 
        "3 ∈ A и 3 ∈ B ✓",
        "4 ∈ A и 4 ∈ B ✓",
        "5 ∈ A и 5 ∈ B ✓",
        "6 ∉ A, но 6 ∈ B",
        "7 ∉ A, но 7 ∈ B",
        "Ответ: A ∩ B = {3, 4, 5}"
      ],
      difficulty: 'hard'
    }
  ];

  const toggleSolution = (problemId: number) => {
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

        <div className="space-y-6">
          {problems.map((problem) => (
            <div key={problem.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-sm font-semibold text-gray-500">Задача {problem.id}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(problem.difficulty)}`}>
                        {getDifficultyText(problem.difficulty)}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{problem.title}</h3>
                  </div>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                  <p className="text-gray-700">{problem.problem}</p>
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

                {expandedSolution === problem.id && (
                  <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-6 animate-fade-in">
                    <div className="flex items-center space-x-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h4 className="text-lg font-semibold text-green-800">Пошаговое решение:</h4>
                    </div>
                    <div className="space-y-3">
                      {problem.solution.map((step, index) => (
                        <div key={index} className="flex space-x-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-green-200 text-green-800 rounded-full flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </span>
                          <p className="text-gray-700">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

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
