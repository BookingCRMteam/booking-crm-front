import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useUserQuery, userApi } from '@/entities/user';
import { User, UserUpdate } from '@/entities/user';

import { SUCCESS_FEEDBACK_DELAY_MS } from '@/shared/constants';
import { delay } from '@/shared/lib/delay';
import { useNotificationStore } from '@/shared/store';

import { extractChangedValues } from './extractChangedValues';
import { CoupleProfileSchemaValues, coupleProfileSchema } from './schema';

interface UseCoupleProfileProps {
  onCancel: () => void;
}

export const useCoupleProfileForm = ({ onCancel }: UseCoupleProfileProps) => {
  const { data: user } = useUserQuery();
  const qc = useQueryClient();
  const showNotification = useNotificationStore((s) => s.showNotification);

  const { mutateAsync, isPending, isSuccess } = useMutation<
    User,
    Error,
    UserUpdate
  >({
    mutationFn: userApi.updateUserData,
    onError: (error) => {
      showNotification(error.message, 'error');
    },
  });

  const form = useForm<CoupleProfileSchemaValues>({
    defaultValues: {
      firstPersonName: user?.firstPersonName ?? '',
      firstPersonSurname: user?.firstPersonSurname ?? '',
      secondPersonName: user?.secondPersonName ?? '',
      secondPersonSurname: user?.secondPersonSurname ?? '',
      phone: user?.phone ?? '',
    },
    resolver: zodResolver(coupleProfileSchema),
    mode: 'onSubmit',
  });
  const {
    formState: { isDirty, dirtyFields },
  } = form;

  const onSubmit = async (data: CoupleProfileSchemaValues) => {
    if (!isDirty) {
      return onCancel();
    }

    const changedValues = extractChangedValues<CoupleProfileSchemaValues>(
      dirtyFields,
      data,
    );

    if (!user) {
      showNotification('Користувача не знайдено', 'error');
      return;
    }

    try {
      const updatedUser = await mutateAsync(changedValues);

      qc.setQueryData(['user', 'me'], updatedUser);
      showNotification('Профіль оновлено', 'success');
      await delay(SUCCESS_FEEDBACK_DELAY_MS);

      onCancel();
    } catch (e) {
      console.error('Mutation failed:', e);
    }
  };

  return { form, onSubmit, isPending, isSuccess, email: user?.email };
};
