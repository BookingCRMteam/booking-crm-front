import { useQuery } from '@tanstack/react-query';

import { useUserQuery } from '@/entities/user';

import { useAccessTokenStore } from '@/shared/session';

import { operatorApi } from '../api/operatorApi';
import { OperatorMe } from '../api/types';

export const useOperatorQuery = () => {
  const { data: user } = useUserQuery();
  const accessToken = useAccessTokenStore((s) => s.accessToken);

  const isOperator = !!accessToken && user?.role === 'operator';

  return useQuery<OperatorMe | null>({
    queryKey: ['operator', 'me'],
    queryFn: () => operatorApi.getOperatorMe(),
    staleTime: 1000 * 60 * 5,
    enabled: isOperator,
    retry: 0,
  });
};
