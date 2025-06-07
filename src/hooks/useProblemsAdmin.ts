
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CreateProblemData {
  title: string;
  problem_text: string;
  solution: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export function useCreateProblem() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (problemData: CreateProblemData) => {
      const { data, error } = await supabase
        .from('problems')
        .insert([problemData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['problems'] });
    }
  });
}

export function useUpdateProblem() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<CreateProblemData> & { id: string }) => {
      const { data, error } = await supabase
        .from('problems')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['problems'] });
    }
  });
}

export function useDeleteProblem() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('problems')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['problems'] });
    }
  });
}
