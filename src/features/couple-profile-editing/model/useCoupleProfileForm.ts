import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { useUserQuery, userApi } from '@/entities/user';
import { User, UserUpdate } from '@/entities/user';

import { useNotificationStore } from '@/shared/store';

import { CoupleProfileSchemaValues, coupleProfileSchema } from './schema';

interface UseCoupleProfileProps {
  onCancel: () => void;
}

export const useCoupleProfileForm = ({ onCancel }: UseCoupleProfileProps) => {
  const { data: user } = useUserQuery();
  const qc = useQueryClient();
  const showNotification = useNotificationStore((s) => s.showNotification);

  const { mutateAsync, isPending } = useMutation<User, Error, UserUpdate>({
    mutationFn: (body) => userApi.updateUserData(body),
    onSuccess: (data) => {
      qc.setQueryData(['user', 'me'], data);
      showNotification('Профіль оновлено', 'success');
      onCancel();
    },
    onError: (error) => {
      showNotification(error.message, 'error');
    },
  });

  const form = useForm<CoupleProfileSchemaValues>({
    defaultValues: {
      email: user?.email ?? '',
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
      onCancel();
    }
    const changedValues = Object.keys(dirtyFields).reduce((acc, key) => {
      acc[key as keyof CoupleProfileSchemaValues] =
        data[key as keyof CoupleProfileSchemaValues];
      return acc;
    }, {} as Partial<CoupleProfileSchemaValues>);

    if (user && isDirty) {
      try {
        await mutateAsync(changedValues);
      } catch (e) {
        console.error('Mutation failed:', e);
      }
    }
  };
  return { form, onSubmit, isPending };
};
