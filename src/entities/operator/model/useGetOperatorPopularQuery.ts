import { useQuery } from '@tanstack/react-query';

import { operatorApi } from '../api/operatorApi';
import type { OperatorPopular } from '../api/types';

export const useGetOperatorPopularQuery = ({
  limit = 3,
}: {
  limit?: number;
}) => {
  return useQuery<OperatorPopular[]>({
    queryKey: ['operator', 'popular', limit],
    queryFn: () => operatorApi.getOperatorsPopular(limit),
    staleTime: Infinity,
    retry: 1,
  });
};
