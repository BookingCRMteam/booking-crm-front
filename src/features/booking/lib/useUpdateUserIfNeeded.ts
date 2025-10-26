import { useMutation, useQueryClient } from '@tanstack/react-query';

import { User, UserUpdate, userApi } from '@/entities/user';

import { logger } from '@/shared/lib/logger';

type UpdatableKey = keyof UserUpdate & keyof User;

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
    const valuesToUpdate: Partial<UserUpdate> = {};

    for (const k of Object.keys(data) as UpdatableKey[]) {
      const next = data[k];
      const current = user[k];

      if (current == null && next !== undefined) {
        valuesToUpdate[k] = next;
      }
    }

    if (Object.keys(valuesToUpdate).length > 0) {
      await mutateAsync(valuesToUpdate);
    }
  };

  return { updateIfMissing };
};
