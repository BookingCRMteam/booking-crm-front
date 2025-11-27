'use client';

import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { OperatorMe, operatorApi } from '@/entities/operator';
import { useOperatorQuery } from '@/entities/operator';

import { SUCCESS_FEEDBACK_DELAY_MS } from '@/shared/constants';
import { delay } from '@/shared/lib/delay';
import { useNotificationStore } from '@/shared/store';

import {
  type OperatorProfileSchemaValues,
  operatorProfileSchema,
} from './schema';

type UseOperatorUpdateProfileProps = {
  onCancel: () => void;
};

export const useOperatorUpdateProfile = ({
  onCancel,
}: UseOperatorUpdateProfileProps) => {
  const showNotification = useNotificationStore((s) => s.showNotification);
  const { data: operator } = useOperatorQuery();
  const qc = useQueryClient();

  const {
    mutateAsync: mutateAsyncSet,
    isPending: isPendingData,
    isSuccess: isSuccessData,
  } = useMutation<OperatorMe, Error, FormData>({
    mutationFn: operatorApi.setPublicData,
  });

  const {
    mutateAsync: mutateAsyncDeletePhoto,
    isPending: isPendingDeletePhoto,
    isSuccess: isSuccessDeletePhoto,
  } = useMutation<OperatorMe, Error, void>({
    mutationFn: operatorApi.deleteMyPhoto,
  });

  const form = useForm<OperatorProfileSchemaValues>({
    defaultValues: {
      philosophy: operator?.philosophy || '',
      description: operator?.description || '',
      photo: undefined,
      removePhoto: false,
    },
    resolver: zodResolver(operatorProfileSchema),
    mode: 'onChange',
  });

  const onSubmit = useCallback(
    async (data: OperatorProfileSchemaValues) => {
      let hasDataChanges = false;
      let finalOperatorData: OperatorMe | null = null;

      try {
        if (data.removePhoto && !(data.photo instanceof File)) {
          finalOperatorData = await mutateAsyncDeletePhoto();
          hasDataChanges = true;
        }

        const fd = new FormData();

        if (data.philosophy !== operator?.philosophy) {
          fd.set('philosophy', data.philosophy ?? '');
          hasDataChanges = true;
        }

        if (data.description !== operator?.description) {
          fd.set('description', data.description ?? '');
          hasDataChanges = true;
        }

        if (data.photo instanceof File) {
          fd.set('photo', data.photo);
          hasDataChanges = true;
        }

        if ([...fd.keys()].length > 0) {
          finalOperatorData = await mutateAsyncSet(fd);
        }

        if (hasDataChanges && finalOperatorData) {
          qc.setQueryData(['operator', 'me'], finalOperatorData);

          showNotification('Профіль оновлено', 'success');

          await delay(SUCCESS_FEEDBACK_DELAY_MS);

          onCancel();
        } else {
          showNotification('Змін не виявлено', 'info');
          onCancel();
        }
      } catch (e) {
        const error = e as Error;
        console.error('Помилка під час оновлення профілю:', error);
        showNotification(
          error.message || 'Не вдалося зберегти профіль. Спробуйте пізніше.',
          'error',
        );
      }
    },
    [
      mutateAsyncSet,
      mutateAsyncDeletePhoto,
      operator,
      qc,
      showNotification,
      onCancel,
    ],
  );

  return {
    form,
    onSubmit,
    operator,
    isPending: isPendingData || isPendingDeletePhoto,
    isSuccess: isSuccessData || isSuccessDeletePhoto,
  };
};
