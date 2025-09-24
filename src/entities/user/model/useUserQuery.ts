import { useQuery } from '@tanstack/react-query';

import { userApi } from '@/entities/user/api/userApi';

import { useAccessTokenStore } from '@/shared/session';

import { User } from '../api/types';

export const useUserQuery = () => {
  const accessToken = useAccessTokenStore((s) => s.accessToken);

  return useQuery<User | null>({
    queryKey: ['user', 'me'],
    queryFn: () => userApi.getCurrentUser(),
    staleTime: 1000 * 60 * 5,
    enabled: !!accessToken,
    retry: 1,
  });
};
