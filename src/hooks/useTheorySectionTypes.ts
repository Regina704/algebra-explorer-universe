
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface TheorySectionType {
  id: string;
  name: string;
  label: string;
  description: string | null;
  icon: string;
  color_class: string;
  created_at: string;
  updated_at: string;
}

export function useTheorySectionTypes() {
  return useQuery({
    queryKey: ['theory-section-types'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('theory_section_types')
        .select('*')
        .order('label', { ascending: true });

      if (error) throw error;
      return data as TheorySectionType[];
    }
  });
}

export function useCreateTheorySectionType() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (sectionType: Omit<TheorySectionType, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('theory_section_types')
        .insert([sectionType])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['theory-section-types'] });
    }
  });
}

export function useUpdateTheorySectionType() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<TheorySectionType> & { id: string }) => {
      const { data, error } = await supabase
        .from('theory_section_types')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['theory-section-types'] });
    }
  });
}

export function useDeleteTheorySectionType() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('theory_section_types')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['theory-section-types'] });
    }
  });
}
