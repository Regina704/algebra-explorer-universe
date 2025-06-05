
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface TestQuestion {
  question: string;
  options: string[];
  correct: number;
}

export interface Test {
  id: string;
  title: string;
  description: string | null;
  questions: TestQuestion[];
  time_limit: number | null;
}

export function useTests() {
  return useQuery({
    queryKey: ['tests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tests')
        .select('*')
        .eq('is_published', true);

      if (error) throw error;
      
      // Преобразуем данные из базы в нужный формат с правильным типированием
      return data.map(test => ({
        id: test.id,
        title: test.title,
        description: test.description,
        questions: (test.questions as unknown) as TestQuestion[],
        time_limit: test.time_limit
      })) as Test[];
    }
  });
}
