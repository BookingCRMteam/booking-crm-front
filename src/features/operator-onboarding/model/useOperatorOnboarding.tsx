import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import {
  type Operator,
  type OperatorOnboarding,
  operatorApi,
} from '@/entities/operator';

import { APP_ROUTE } from '@/shared/constants';
import { useNotificationStore } from '@/shared/store';

import {
  OperatorOnboardingSchemaValues,
  operatorOnboardingSchema,
} from './schema';

export const useOperatorOnboarding = () => {
  const qc = useQueryClient();
  const router = useRouter();
  const showNotification = useNotificationStore((s) => s.showNotification);

  const { mutateAsync, isPending } = useMutation<
    Operator,
    Error,
    OperatorOnboarding
  >({
    mutationFn: (body) => operatorApi.setNewOperator(body),
    onSuccess: () => {
      showNotification('Operator created successfully!', 'success');
      qc.invalidateQueries({ queryKey: ['user', 'me'] });
      qc.invalidateQueries({ queryKey: ['operator', 'me'] });
    },
    onError: (error) => {
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
  return { form, onSubmit, isPending };
};
