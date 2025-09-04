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
import { omit } from '@/shared/utils/omit';

import { useStore } from '@/store';

import {
  OperatorOnboardingSchemaValues,
  operatorOnboardingSchema,
} from './schema';

export const useOperatorOnboarding = () => {
  const showNotification = useStore((s) => s.showNotification);
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
    const restOfOperator = omit(data, ['accept']);
    try {
      await mutateAsync(restOfOperator);
      router.push(APP_ROUTE.OPERATOR);
    } catch (e) {
      console.error('Mutation failed:', e);
    }
  };
  return { form, onSubmit, isError, isPending, isSuccess, error };
};
