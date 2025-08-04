import { getAccessToken, useUser } from '@auth0/nextjs-auth0';
import { useQuery } from '@tanstack/react-query';

import { useCallback, useEffect } from 'react';

import { userApi } from '@/shared/api/user';

import { useStore } from '@/store';

export const useCurrentUser = () => {
  const {
    user: auth0User,
    isLoading: isAuth0Loading,
    error: auth0Error,
  } = useUser();
  const setUser = useStore((state) => state.setUser);
  const user = useStore((state) => state.user);

  const {
    isLoading,
    error: queryError,
    isError: isQueryError,
  } = useQuery({
    queryKey: ['currentUser', auth0User?.sub],
    queryFn: async () => {
      if (!auth0User) {
        clearUser();
        return null;
      }

      if (user && user.sub === auth0User.sub) {
        return user;
      }

      try {
        const accessToken = await getAccessToken();
        if (!accessToken) {
          clearUser();
          return null;
        }

        const userData = await userApi.getCurrentUser(accessToken);
        setUser(userData);
        return userData;
      } catch (error) {
        clearUser();
        throw error;
      }
    },
    enabled: !isAuth0Loading && (!!auth0User || !!user),
    retry: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const clearUser = useCallback(() => {
    if (user) {
      console.debug('Clearing user from store');
      setUser(null);
    }
  }, [setUser, user]);

  useEffect(() => {
    if (
      (auth0Error && !isAuth0Loading) ||
      (!auth0User && !isAuth0Loading) ||
      isQueryError
    ) {
      clearUser();
    }
  }, [auth0Error, isAuth0Loading, auth0User, isQueryError, clearUser]);

  return {
    user,
    isLoading: isLoading || isAuth0Loading,
    isError: isQueryError || !!auth0Error,
    error: queryError || auth0Error,
  };
};
