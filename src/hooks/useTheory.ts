
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type TheoryType = 'definition' | 'notation' | 'example';

export interface TheorySection {
  id: string;
  title: string;
  content: string;
  section_type: TheoryType;
  order_index: number;
  is_published: boolean;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export function useTheory() {
  return useQuery({
    queryKey: ['theory'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('theory_sections')
        .select('*')
        .eq('is_published', true)
        .order('title', { ascending: true });

      if (error) throw error;
      return data as TheorySection[];
    }
  });
}

export function useCreateTheorySection() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (section: Omit<TheorySection, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('theory_sections')
        .insert([section])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['theory'] });
    }
  });
}

export function useUpdateTheorySection() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<TheorySection> & { id: string }) => {
      const { data, error } = await supabase
        .from('theory_sections')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['theory'] });
    }
  });
}

export function useDeleteTheorySection() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('theory_sections')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['theory'] });
    }
  });
}
