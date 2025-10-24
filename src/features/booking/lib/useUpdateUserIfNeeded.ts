import { useMutation, useQueryClient } from '@tanstack/react-query';

import { User, UserUpdate, userApi } from '@/entities/user';

import { logger } from '@/shared/lib/logger';

export const useUpdateUserIfNeeded = () => {
  const qc = useQueryClient();

  const { mutateAsync } = useMutation<User, Error, UserUpdate>({
    mutationFn: userApi.updateUserData,
    onSuccess: (data) => {
      qc.setQueryData(['user', 'me'], data);
      logger.info('User data updated successfully');
    },
    onError: (error) => {
      logger.error('Failed to update user data:', error);
    },
  });

  const updateIfMissing = async (user: User, data: Partial<UserUpdate>) => {
    const valuesToUpdate = Object.keys(data).reduce((acc, key) => {
      if (!user[key as keyof User] && data[key as keyof UserUpdate]) {
        acc[key as keyof UserUpdate] = data[key as keyof UserUpdate];
      }
      return acc;
    }, {} as UserUpdate);

    if (Object.keys(valuesToUpdate).length > 0) {
      await mutateAsync(valuesToUpdate);
    }
  };

  return { updateIfMissing };
};
