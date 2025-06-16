
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateTest, TestType } from '@/hooks/useTestsAdmin';
import { useToast } from '@/components/ui/use-toast';
import { TestQuestion } from '@/hooks/useTests';
import { Plus, Trash2, BookOpen } from 'lucide-react';

export function TestForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState<number | null>(null);
  const [testType, setTestType] = useState<TestType>('theory');
  const [questions, setQuestions] = useState<TestQuestion[]>([
    { question: '', options: ['', '', '', ''], correct: 0 }
  ]);

  const createTest = useCreateTest();
  const { toast } = useToast();

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correct: 0 }]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const updateQuestion = (index: number, field: keyof TestQuestion, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex] = value;
    setQuestions(updated);
  };

  const loadSetsTemplate = () => {
    setTitle('Тест: Множество. Элемент множества');
    setDescription('Базовый тест на знание теоретических основ теории множеств');
    setTimeLimit(15);
    setTestType('theory');
    setQuestions([
      {
        question: 'Что такое множество?',
        options: [
          'Совокупность различных объектов, рассматриваемых как единое целое',
          'Упорядоченная последовательность элементов',
          'Группа одинаковых объектов',
          'Числовая последовательность'
        ],
        correct: 0
      },
      {
        question: 'Как обозначается принадлежность элемента множеству?',
        options: [
          'a ⊂ A',
          'a ∈ A',
          'a ∪ A',
          'a ∩ A'
        ],
        correct: 1
      },
      {
        question: 'Что означает запись B ⊆ A?',
        options: [
          'B больше A',
          'B не равно A',
          'B является подмножеством A',
          'B пересекается с A'
        ],
        correct: 2
      },
      {
        question: 'Какое множество называется пустым?',
        options: [
          'Множество, содержащее один элемент',
          'Множество, не содержащее ни одного элемента',
          'Множество, содержащее бесконечно много элементов',
          'Множество, содержащее только числа'
        ],
        correct: 1
      },
      {
        question: 'Как обозначается пустое множество?',
        options: [
          '{}',
          '∅',
          'Оба варианта верны',
          'Ø'
        ],
        correct: 2
      },
      {
        question: 'Что такое мощность множества?',
        options: [
          'Сумма всех элементов множества',
          'Количество элементов в множестве',
          'Произведение всех элементов множества',
          'Максимальный элемент множества'
        ],
        correct: 1
      },
      {
        question: 'Какие множества называются равными?',
        options: [
          'Множества с одинаковой мощностью',
          'Множества, состоящие из одних и тех же элементов',
          'Множества, записанные одинаково',
          'Множества с похожими элементами'
        ],
        correct: 1
      },
      {
        question: 'Что такое универсальное множество?',
        options: [
          'Множество всех чисел',
          'Самое большое множество',
          'Множество, содержащее все рассматриваемые объекты',
          'Множество всех букв'
        ],
        correct: 2
      },
      {
        question: 'Может ли элемент множества сам быть множеством?',
        options: [
          'Да, может',
          'Нет, не может',
          'Только если это числовое множество',
          'Только в особых случаях'
        ],
        correct: 0
      },
      {
        question: 'Что означает запись |A| = 5?',
        options: [
          'Множество A содержит элемент 5',
          'Множество A состоит из 5 элементов',
          'Множество A равно 5',
          'Множество A больше 5'
        ],
        correct: 1
      }
    ]);

    toast({
      title: "Шаблон загружен",
      description: "Загружен тест по теме 'Множество. Элемент множества'"
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите название теста",
        variant: "destructive"
      });
      return;
    }

    const invalidQuestions = questions.some(q => 
      !q.question.trim() || q.options.some(opt => !opt.trim())
    );

    if (invalidQuestions) {
      toast({
        title: "Ошибка",
        description: "Заполните все вопросы и варианты ответов",
        variant: "destructive"
      });
      return;
    }

    try {
      await createTest.mutateAsync({
        title,
        description: description || null,
        questions,
        time_limit: timeLimit,
        is_published: true,
        test_type: testType
      });

      toast({
        title: "Успех",
        description: "Тест успешно создан"
      });

      // Сброс формы
      setTitle('');
      setDescription('');
      setTimeLimit(null);
      setTestType('theory');
      setQuestions([{ question: '', options: ['', '', '', ''], correct: 0 }]);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать тест",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Создать новый тест</h3>
        <Button 
          type="button" 
          onClick={loadSetsTemplate}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <BookOpen className="w-4 h-4" />
          <span>Загрузить тест "Множества"</span>
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Название теста *</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите название теста"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Тип теста *</label>
            <Select value={testType} onValueChange={(value: TestType) => setTestType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="theory">Теория</SelectItem>
                <SelectItem value="practice">Практика</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Ограничение по времени (минуты)</label>
            <Input
              type="number"
              value={timeLimit || ''}
              onChange={(e) => setTimeLimit(e.target.value ? parseInt(e.target.value) : null)}
              placeholder="Без ограничений"
              min="1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Описание</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Краткое описание теста (необязательно)"
            rows={3}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium">Вопросы</h4>
            <Button type="button" onClick={addQuestion} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Добавить вопрос
            </Button>
          </div>

          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="border rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium">Вопрос {questionIndex + 1}</h5>
                {questions.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeQuestion(questionIndex)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Текст вопроса *</label>
                  <Input
                    value={question.question}
                    onChange={(e) => updateQuestion(questionIndex, 'question', e.target.value)}
                    placeholder="Введите текст вопроса"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Варианты ответов *</label>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2 mb-2">
                      <input
                        type="radio"
                        name={`correct-${questionIndex}`}
                        checked={question.correct === optionIndex}
                        onChange={() => updateQuestion(questionIndex, 'correct', optionIndex)}
                        className="mt-1"
                      />
                      <Input
                        value={option}
                        onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                        placeholder={`Вариант ${optionIndex + 1}`}
                        required
                      />
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {question.correct === optionIndex ? '(правильный)' : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button 
          type="submit" 
          disabled={createTest.isPending}
          className="w-full"
        >
          {createTest.isPending ? 'Создание...' : 'Создать тест'}
        </Button>
      </form>
    </div>
  );
}
