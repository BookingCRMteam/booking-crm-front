import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';

import {
  Operator,
  OperatorOnboarding,
  operatorApi,
} from '@/shared/api/operator';
import { APP_ROUTE } from '@/shared/constants/routes';

import { useNotificationStore } from '@/store/notificationSlice';

import {
  OperatorOnboardingSchemaValues,
  operatorOnboardingSchema,
} from './schema';

export const useOperatorOnboarding = () => {
  const showNotification = useNotificationStore((s) => s.showNotification);
  const router = useRouter();

  const { mutateAsync, isPending, isSuccess, error, isError } = useMutation<
    Operator,
    Error,
    OperatorOnboarding
  >({
    mutationFn: (body) => operatorApi.setNewOperator(body),
    onSuccess: () => {
      showNotification('Operator created successfully!', 'success');
    },
    onError: (error) => {
      console.log(error);
      showNotification(error.message, 'error');
    },
  });

  const form = useForm<OperatorOnboardingSchemaValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      website: '',
      accept: true,
    },
    resolver: zodResolver(operatorOnboardingSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: OperatorOnboardingSchemaValues) => {
    const { firstName, lastName, phone, website } = data;
    try {
      await mutateAsync({ firstName, lastName, phone, website });
      router.push(APP_ROUTE.OPERATOR);
    } catch (e) {
      console.error('Mutation failed:', e);
    }
  };
  return { form, onSubmit, isError, isPending, isSuccess, error };
};
