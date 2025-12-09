import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import {
  type OperatorMe,
  type OperatorOnboarding,
  operatorApi,
  useOperatorQuery,
} from '@/entities/operator';

import { APP_ROUTE } from '@/shared/constants';
import { useNotificationStore } from '@/shared/store';

import {
  type OperatorOnboardingSchemaValues,
  operatorOnboardingSchema,
} from './schema';

export const useOperatorOnboarding = () => {
  const { data: operator } = useOperatorQuery();
  const qc = useQueryClient();
  const router = useRouter();
  const showNotification = useNotificationStore((s) => s.showNotification);

  const handleSuccess = (data: OperatorMe, message: string) => {
    showNotification(message, 'success');
    qc.setQueryData(['operator', 'me'], data);
    qc.invalidateQueries({ queryKey: ['user', 'me'] });
  };

  const {
    mutateAsync,
    isPending: isPendingCreateOperator,
    isSuccess: isSuccessCreateOperator,
  } = useMutation<OperatorMe, Error, OperatorOnboarding>({
    mutationFn: operatorApi.setNewOperator,
    onSuccess: (data) => handleSuccess(data, 'Operator created successfully!'),
    onError: (error) => {
      showNotification(error.message, 'error');
    },
  });

  const {
    mutateAsync: updateOperatorMutation,
    isPending: isPendingUpdateOperator,
    isSuccess: isSuccessUpdateOperator,
  } = useMutation<OperatorMe, Error, FormData>({
    mutationFn: operatorApi.setPublicData,
    onSuccess: (data) => handleSuccess(data, 'Operator updated successfully!'),
    onError: (error) => {
      showNotification(error.message, 'error');
    },
  });

  const form = useForm<OperatorOnboardingSchemaValues>({
    defaultValues: {
      firstName: operator?.firstName || '',
      lastName: operator?.lastName || '',
      phone: operator?.phone || '',
      website: operator?.website || '',
      accept: true,
    },
    resolver: zodResolver(operatorOnboardingSchema),
    mode: 'onTouched',
  });
  const isRejected = operator?.status === 'rejected';

  const onSubmit = async (data: OperatorOnboardingSchemaValues) => {
    const { firstName, lastName, phone, website } = data;
    try {
      if (isRejected) {
        const fd = new FormData();
        fd.set('firstName', firstName);
        fd.set('lastName', lastName);
        fd.set('phone', phone);
        fd.set('website', website);
        await updateOperatorMutation(fd);
      } else {
        await mutateAsync({ firstName, lastName, phone, website });
      }
      router.push(APP_ROUTE.OPERATOR);
    } catch (e) {
      console.error('Mutation failed:', e);
    }
  };
  const isPending = isPendingCreateOperator || isPendingUpdateOperator;
  const isSuccess = isSuccessCreateOperator || isSuccessUpdateOperator;

  return { form, onSubmit, isPending, isSuccess, isRejected };
};
