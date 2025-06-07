
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle } from 'lucide-react';
import { useTests } from '@/hooks/useTests';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const TakeTest = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { data: tests = [] } = useTests();
  
  const test = tests.find(t => t.id === testId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  // Инициализация таймера
  useEffect(() => {
    if (test?.time_limit) {
      setTimeLeft(test.time_limit * 60); // конвертируем минуты в секунды
    }
  }, [test]);

  // Таймер
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev && prev <= 1) {
          setIsFinished(true);
          return 0;
        }
        return prev ? prev - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isFinished]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleNext = () => {
    if (test && currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  const calculateScore = () => {
    if (!test) return 0;
    
    let correct = 0;
    test.questions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        correct++;
      }
    });
    
    return Math.round((correct / test.questions.length) * 100);
  };

  if (!test) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Тест не найден</h2>
          <Link to="/tests" className="text-indigo-600 hover:text-indigo-800">
            ← Вернуться к тестам
          </Link>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <header className="bg-white shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center space-x-4">
              <Link to="/tests" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">Результат теста</h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Тест завершен!</h2>
            <p className="text-xl text-gray-600 mb-6">{test.title}</p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="text-4xl font-bold text-indigo-600 mb-2">{score}%</div>
              <div className="text-gray-600">
                Правильных ответов: {Object.values(answers).filter((answer, index) => 
                  answer === test.questions[index]?.correct
                ).length} из {test.questions.length}
              </div>
            </div>

            <div className="space-y-4">
              <Button onClick={() => navigate('/tests')} className="w-full">
                Вернуться к тестам
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()} 
                className="w-full"
              >
                Пройти заново
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = test.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/tests" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">{test.title}</h1>
            </div>
            {timeLeft !== null && (
              <div className="flex items-center space-x-2 text-indigo-600">
                <Clock className="w-5 h-5" />
                <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">
                Вопрос {currentQuestion + 1} из {test.questions.length}
              </span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / test.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">{currentQ.question}</h3>
            
            <RadioGroup 
              value={answers[currentQuestion]?.toString()} 
              onValueChange={(value) => handleAnswerChange(currentQuestion, parseInt(value))}
              className="space-y-4"
            >
              {currentQ.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Назад
            </Button>
            
            <div className="space-x-4">
              {currentQuestion === test.questions.length - 1 ? (
                <Button onClick={handleFinish}>
                  Завершить тест
                </Button>
              ) : (
                <Button 
                  onClick={handleNext}
                  disabled={answers[currentQuestion] === undefined}
                >
                  Далее
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeTest;
