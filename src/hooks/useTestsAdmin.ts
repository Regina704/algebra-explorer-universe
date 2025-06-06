
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { TestQuestion } from './useTests';

export interface CreateTestData {
  title: string;
  description: string | null;
  questions: TestQuestion[];
  time_limit: number | null;
  is_published: boolean;
}

export function useCreateTest() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (testData: CreateTestData) => {
      const { data, error } = await supabase
        .from('tests')
        .insert([{
          title: testData.title,
          description: testData.description,
          questions: testData.questions as any,
          time_limit: testData.time_limit,
          is_published: testData.is_published
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests'] });
    }
  });
}

export function useUpdateTest() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<CreateTestData> & { id: string }) => {
      const updateData: any = {};
      
      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.questions !== undefined) updateData.questions = updates.questions as any;
      if (updates.time_limit !== undefined) updateData.time_limit = updates.time_limit;
      if (updates.is_published !== undefined) updateData.is_published = updates.is_published;

      const { data, error } = await supabase
        .from('tests')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests'] });
    }
  });
}

export function useDeleteTest() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('tests')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests'] });
    }
  });
}
