import { useQuery } from '@tanstack/react-query';

import { fetchTour } from '../api/toursApi';

export const useFetchTour = (id: number | undefined, enabled: boolean) => {
  return useQuery({
    queryKey: ['tour', id],
    queryFn: () => {
      if (id == null) throw new Error('Tour id is required when enabled');
      return fetchTour(id);
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: enabled && id != null,
  });
};
