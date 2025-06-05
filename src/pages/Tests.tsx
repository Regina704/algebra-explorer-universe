import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, CheckCircle, XCircle, RotateCcw, Brain } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  type: 'single' | 'multiple';
}

interface TestResult {
  score: number;
  total: number;
  answers: number[];
}

const Tests = () => {
  const [currentTest, setCurrentTest] = useState<'theory' | 'practice' | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const theoryQuestions: Question[] = [
    {
      id: 1,
      question: "Что такое множество?",
      options: [
        "Совокупность различных элементов",
        "Группа одинаковых объектов", 
        "Набор чисел",
        "Математическая операция"
      ],
      correctAnswer: 0,
      explanation: "Множество — это совокупность определённых и различимых между собой объектов, мыслимая как единое целое.",
      type: 'single'
    },
    {
      id: 2,
      question: "Какой символ обозначает принадлежность элемента множеству?",
      options: ["⊂", "∈", "∪", "∩"],
      correctAnswer: 1,
      explanation: "Символ ∈ означает 'принадлежит'. Если элемент a принадлежит множеству A, то пишут a ∈ A.",
      type: 'single'
    },
    {
      id: 3,
      question: "Сколько элементов в множестве A = {1, 2, 2, 3, 3, 3}?",
      options: ["6", "3", "4", "5"],
      correctAnswer: 1,
      explanation: "В множестве каждый элемент может входить только один раз. Поэтому A = {1, 2, 3}, и в нём 3 элемента.",
      type: 'single'
    },
    {
      id: 4,
      question: "Какие из способов можно использовать для задания множеств?",
      options: [
        "Перечисление элементов",
        "Описание характеристического свойства",
        "Диаграмма Эйлера-Венна",
        "Все перечисленные"
      ],
      correctAnswer: 3,
      explanation: "Множества можно задавать перечислением элементов, описанием свойства и графически с помощью диаграмм.",
      type: 'single'
    },
    {
      id: 5,
      question: "Что обозначает символ ∅?",
      options: [
        "Универсальное множество",
        "Пустое множество", 
        "Бесконечное множество",
        "Единичное множество"
      ],
      correctAnswer: 1,
      explanation: "Символ ∅ обозначает пустое множество — множество, не содержащее ни одного элемента.",
      type: 'single'
    }
  ];

  const practiceQuestions: Question[] = [
    {
      id: 1,
      question: "Дано A = {2, 4, 6, 8}. Какие утверждения верны?",
      options: [
        "4 ∈ A",
        "5 ∈ A",
        "8 ∈ A", 
        "10 ∈ A"
      ],
      correctAnswer: 0, // This will be handled differently for multiple choice
      explanation: "Правильные ответы: 4 ∈ A и 8 ∈ A, так как эти элементы есть в множестве A.",
      type: 'single'
    },
    {
      id: 2,
      question: "Множество B = {x | x — четное число, 0 < x ≤ 6} равно:",
      options: [
        "{2, 4, 6}",
        "{0, 2, 4, 6}",
        "{1, 3, 5}",
        "{2, 4, 6, 8}"
      ],
      correctAnswer: 0,
      explanation: "Четные числа от 0 до 6 (не включая 0): 2, 4, 6.",
      type: 'single'
    },
    {
      id: 3,
      question: "Сколько подмножеств у множества {a, b, c}?",
      options: ["6", "7", "8", "9"],
      correctAnswer: 2,
      explanation: "Количество подмножеств = 2ⁿ = 2³ = 8, где n = 3 — количество элементов.",
      type: 'single'
    },
    {
      id: 4,
      question: "Если A = {1, 2, 3} и B = {2, 3, 4}, то A ∩ B равно:",
      options: [
        "{1, 2, 3, 4}",
        "{2, 3}",
        "{1, 4}",
        "∅"
      ],
      correctAnswer: 1,
      explanation: "Пересечение A ∩ B содержит элементы, принадлежащие одновременно A и B: {2, 3}.",
      type: 'single'
    },
    {
      id: 5,
      question: "Равны ли множества {1, 2, 3} и {3, 1, 2}?",
      options: [
        "Да, равны",
        "Нет, не равны",
        "Зависит от порядка",
        "Невозможно определить"
      ],
      correctAnswer: 0,
      explanation: "Да, множества равны. В множествах порядок элементов не важен.",
      type: 'single'
    }
  ];

  const startTest = (testType: 'theory' | 'practice') => {
    setCurrentTest(testType);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setTestResult(null);
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    const questions = currentTest === 'theory' ? theoryQuestions : practiceQuestions;
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    const questions = currentTest === 'theory' ? theoryQuestions : practiceQuestions;
    let score = 0;
    
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        score++;
      }
    });

    setTestResult({
      score,
      total: questions.length,
      answers: selectedAnswers
    });
    setShowResults(true);
  };

  const resetTest = () => {
    setCurrentTest(null);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setTestResult(null);
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (showResults && testResult) {
    const questions = currentTest === 'theory' ? theoryQuestions : practiceQuestions;
    const percentage = Math.round((testResult.score / testResult.total) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <header className="bg-white shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <Users className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-800">Результаты теста</h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Тест завершён!</h2>
                <div className="text-6xl font-bold mb-4">
                  <span className={getScoreColor(testResult.score, testResult.total)}>
                    {testResult.score}/{testResult.total}
                  </span>
                </div>
                <p className="text-xl text-gray-600">
                  Ваш результат: <span className={getScoreColor(testResult.score, testResult.total)}>{percentage}%</span>
                </p>
              </div>

              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div key={question.id} className="border rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {testResult.answers[index] === question.correctAnswer ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2">
                          Вопрос {index + 1}: {question.question}
                        </h3>
                        <div className="space-y-2 mb-4">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-lg ${
                                optionIndex === question.correctAnswer
                                  ? 'bg-green-100 border border-green-300'
                                  : optionIndex === testResult.answers[index] && optionIndex !== question.correctAnswer
                                  ? 'bg-red-100 border border-red-300'
                                  : 'bg-gray-50'
                              }`}
                            >
                              {option}
                              {optionIndex === question.correctAnswer && (
                                <span className="ml-2 text-green-600 font-semibold">✓ Правильный ответ</span>
                              )}
                              {optionIndex === testResult.answers[index] && optionIndex !== question.correctAnswer && (
                                <span className="ml-2 text-red-600 font-semibold">✗ Ваш ответ</span>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <strong>Объяснение:</strong> {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center space-x-4">
                <button
                  onClick={resetTest}
                  className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Пройти снова</span>
                </button>
                <Link
                  to="/theory"
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span>Изучить теорию</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentTest) {
    const questions = currentTest === 'theory' ? theoryQuestions : practiceQuestions;
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <header className="bg-white shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button onClick={resetTest} className="text-indigo-600 hover:text-indigo-800 transition-colors">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <Users className="w-8 h-8 text-purple-600" />
                <h1 className="text-2xl font-bold text-gray-800">
                  {currentTest === 'theory' ? 'Тест по теории' : 'Практический тест'}
                </h1>
              </div>
              <div className="text-sm text-gray-600">
                Вопрос {currentQuestion + 1} из {questions.length}
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h2>
              
              <div className="space-y-3 mb-8">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswers[currentQuestion] === index
                          ? 'border-indigo-500 bg-indigo-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswers[currentQuestion] === index && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="text-gray-700">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Назад
                </button>
                <button
                  onClick={nextQuestion}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentQuestion === questions.length - 1 ? 'Завершить тест' : 'Далее'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-indigo-600 hover:text-indigo-800 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <Users className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-800">Тестирование знаний</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Выберите тип теста</h2>
            <p className="text-xl text-gray-600">
              Проверьте свои знания по теме "Множество. Элемент множества"
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Тест по теории</h3>
                <p className="text-gray-600 mb-6">
                  Проверьте знание основных определений, обозначений и теоретических концепций
                </p>
                <ul className="text-left text-gray-600 mb-6 space-y-2">
                  <li>• 5 вопросов</li>
                  <li>• Основные определения</li>
                  <li>• Математические символы</li>
                  <li>• Способы задания множеств</li>
                </ul>
                <button
                  onClick={() => startTest('theory')}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Начать тест по теории
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Практический тест</h3>
                <p className="text-gray-600 mb-6">
                  Решайте практические задачи на применение знаний о множествах
                </p>
                <ul className="text-left text-gray-600 mb-6 space-y-2">
                  <li>• 5 задач</li>
                  <li>• Принадлежность элементов</li>
                  <li>• Операции с множествами</li>
                  <li>• Подмножества</li>
                </ul>
                <button
                  onClick={() => startTest('practice')}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Начать практический тест
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Рекомендации</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Перед тестом</h4>
                <p className="text-gray-600 text-sm">Изучите теоретический материал и разберите примеры задач</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Во время теста</h4>
                <p className="text-gray-600 text-sm">Внимательно читайте вопросы и не торопитесь с ответами</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">После теста</h4>
                <p className="text-gray-600 text-sm">Разберите ошибки и повторите сложные темы</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tests;
