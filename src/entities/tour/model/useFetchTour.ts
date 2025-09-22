import { useQuery } from '@tanstack/react-query';

import { fetchTour } from '../api/toursApi';

export const useFetchTour = (id: number, enabled: boolean) => {
  return useQuery({
    queryKey: ['tour', id],
    queryFn: () => fetchTour(id),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled,
  });
};
