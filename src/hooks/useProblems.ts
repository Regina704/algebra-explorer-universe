
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Problem {
  id: string;
  title: string;
  problem_text: string;
  solution: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export function useProblems() {
  return useQuery({
    queryKey: ['problems'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('problems')
        .select('*')
        .order('title', { ascending: true });

      if (error) throw error;
      return data as Problem[];
    }
  });
}
