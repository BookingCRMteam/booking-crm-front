import { useQuery } from '@tanstack/react-query';

import { useAccessTokenStore } from '@/shared/session';

import { operatorApi } from '../api/operatorApi';
import { OperatorMe } from '../api/types';

export const useOperatorQuery = () => {
  const accessToken = useAccessTokenStore((s) => s.accessToken);
  const isAccessToken = !!accessToken;
  return useQuery<OperatorMe | null>({
    queryKey: ['operator', 'me'],
    queryFn: async () => {
      return operatorApi.getOperatorMe();
    },
    staleTime: 1000 * 60 * 1,
    refetchOnMount: isAccessToken,
    refetchOnWindowFocus: isAccessToken,
    retry: 1,
  });
};
