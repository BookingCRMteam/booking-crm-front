import { getAccessToken, useUser } from '@auth0/nextjs-auth0';
import { useQuery } from '@tanstack/react-query';

import { userApi } from '@/shared/api/user';

import { useStore } from '@/store';

export const useCurrentUser = () => {
  const { user: auth0User, isLoading: isAuth0Loading } = useUser();
  const setUser = useStore((state) => state.setUser);
  const user = useStore((state) => state.user);

  const { isLoading } = useQuery({
    queryKey: ['currentUser', auth0User?.sub],
    queryFn: async () => {
      if (!auth0User) return null;
      // Якщо у нас вже є користувач в store і його id співпадає з auth0 id,
      // повертаємо його без запиту на бекенд
      if (user && user.id === auth0User.sub) {
        return user;
      }

      const accessToken = await getAccessToken();
      const userData = await userApi.getCurrentUser(accessToken);
      setUser(userData);
      return userData;
    },
    enabled: !!auth0User,
    retry: false,
    // Налаштування кешування
    staleTime: 5 * 60 * 1000, // Дані вважаються свіжими протягом 5 хвилин
    gcTime: 30 * 60 * 1000, // Кеш живе 30 хвилин
  });

  return {
    user,
    isLoading: isLoading || isAuth0Loading,
  };
};
