import { useQuery } from '@tanstack/react-query';

import { fetchTours } from '../api/toursApi';
import type { FetchToursArgs } from '../api/toursApi';

export const useFetchTours = ({
  limit = 3,
  offset = 0,
  isFeatured = false,
}: FetchToursArgs) => {
  return useQuery({
    queryKey: ['tours', limit, offset, isFeatured],
    queryFn: () => fetchTours({ limit, offset, isFeatured }),
    staleTime: Infinity,
    retry: 1,
  });
};
