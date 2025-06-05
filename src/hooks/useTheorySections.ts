
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface TheorySection {
  id: string;
  title: string;
  content: string;
  order_index: number;
}

export function useTheorySections() {
  return useQuery({
    queryKey: ['theory-sections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('theory_sections')
        .select('*')
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as TheorySection[];
    }
  });
}
