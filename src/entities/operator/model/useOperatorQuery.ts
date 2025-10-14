import { useQuery } from '@tanstack/react-query';

import { useUserQuery } from '@/entities/user';

import { operatorApi } from '../api/operatorApi';
import { OperatorMe } from '../api/types';

export const useOperatorQuery = () => {
  const { data: user } = useUserQuery();
  return useQuery<OperatorMe | null>({
    queryKey: ['operator', 'me'],
    queryFn: async () => {
      return operatorApi.getOperatorMe();
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!user && user.role === 'operator',
    retry: 1,
  });
};
