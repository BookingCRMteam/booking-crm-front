import { useMutation, useQueryClient } from '@tanstack/react-query';

import { User, UserUpdate, userApi } from '@/entities/user';

import { logger } from '@/shared/lib/logger';

export const useUpdateUserIfNeeded = () => {
  const qc = useQueryClient();

  const { mutateAsync } = useMutation<User, Error, Partial<UserUpdate>>({
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
      const k = key as keyof UserUpdate;

      if (user[k] == null && data[k] !== undefined) {
        acc[k] = data[k];
      }
      return acc;
    }, {} as Partial<UserUpdate>);

    if (Object.keys(valuesToUpdate).length > 0) {
      await mutateAsync(valuesToUpdate);
    }
  };

  return { updateIfMissing };
};
