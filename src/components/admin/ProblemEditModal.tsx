
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUpdateProblem } from '@/hooks/useProblemsAdmin';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Trash2 } from 'lucide-react';
import type { Problem } from '@/hooks/useProblems';

interface ProblemEditModalProps {
  problem: Problem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProblemEditModal({ problem, isOpen, onClose }: ProblemEditModalProps) {
  const [title, setTitle] = useState('');
  const [problemText, setProblemText] = useState('');
  const [solution, setSolution] = useState<string[]>(['']);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  
  const updateProblem = useUpdateProblem();
  const { toast } = useToast();

  useEffect(() => {
    if (problem) {
      setTitle(problem.title);
      setProblemText(problem.problem_text);
      setSolution(problem.solution.length > 0 ? problem.solution : ['']);
      setDifficulty(problem.difficulty);
    }
  }, [problem]);

  const addSolutionStep = () => {
    setSolution([...solution, '']);
  };

  const removeSolutionStep = (index: number) => {
    if (solution.length > 1) {
      setSolution(solution.filter((_, i) => i !== index));
    }
  };

  const updateSolutionStep = (index: number, value: string) => {
    const newSolution = [...solution];
    newSolution[index] = value;
    setSolution(newSolution);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!problem || !title.trim() || !problemText.trim()) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    const filteredSolution = solution.filter(step => step.trim() !== '');
    
    try {
      await updateProblem.mutateAsync({
        id: problem.id,
        title: title.trim(),
        problem_text: problemText.trim(),
        solution: filteredSolution,
        difficulty
      });

      toast({
        title: "Успех",
        description: "Задача успешно обновлена"
      });

      onClose();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить задачу",
        variant: "destructive"
      });
    }
  };

  const handleClose = () => {
    if (problem) {
      setTitle(problem.title);
      setProblemText(problem.problem_text);
      setSolution(problem.solution.length > 0 ? problem.solution : ['']);
      setDifficulty(problem.difficulty);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Редактировать задачу</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название задачи *
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите название задачи"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Сложность
            </label>
            <Select value={difficulty} onValueChange={(value: any) => setDifficulty(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Легкая</SelectItem>
                <SelectItem value="medium">Средняя</SelectItem>
                <SelectItem value="hard">Сложная</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Текст задачи *
            </label>
            <Textarea
              value={problemText}
              onChange={(e) => setProblemText(e.target.value)}
              placeholder="Введите условие задачи"
              rows={6}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Решение (пошаговое)
            </label>
            {solution.map((step, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <div className="flex-1">
                  <Textarea
                    value={step}
                    onChange={(e) => updateSolutionStep(index, e.target.value)}
                    placeholder={`Шаг ${index + 1}`}
                    rows={2}
                  />
                </div>
                {solution.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeSolutionStep(index)}
                    className="shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addSolutionStep}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Добавить шаг решения
            </Button>
          </div>

          <div className="flex gap-4">
            <Button 
              type="submit" 
              className="flex-1"
              disabled={updateProblem.isPending}
            >
              {updateProblem.isPending ? 'Сохранение...' : 'Сохранить изменения'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              className="flex-1"
            >
              Отмена
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
