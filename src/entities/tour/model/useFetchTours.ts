import { useQuery } from '@tanstack/react-query';

import { fetchTours } from '../api/toursApi';

export const useFetchTours = ({
  limit = 3,
  offset = 0,
}: {
  limit?: number;
  offset?: number;
} = {}) => {
  return useQuery({
    queryKey: ['tours', limit, offset],
    queryFn: () => {
      return fetchTours({ limit, offset });
    },
    staleTime: Infinity,
  });
};
