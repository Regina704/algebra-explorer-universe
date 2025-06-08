
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface HistorySection {
  id: string;
  section_type: string;
  title: string;
  content: string;
  image_url: string | null;
  order_index: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export function useHistory() {
  return useQuery({
    queryKey: ['history'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('history_sections')
        .select('*')
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as HistorySection[];
    }
  });
}

export function useUpdateHistorySection() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<HistorySection> & { id: string }) => {
      const { data, error } = await supabase
        .from('history_sections')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['history'] });
    }
  });
}
