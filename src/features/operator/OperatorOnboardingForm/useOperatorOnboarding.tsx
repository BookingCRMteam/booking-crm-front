import { useMutation } from '@tanstack/react-query';

import {
  Operator,
  OperatorOnboarding,
  operatorApi,
} from '@/shared/api/operator';

import { useStore } from '@/store';

export const useOperatorOnboarding = () => {
  const showNotification = useStore((s) => s.showNotification);

  return useMutation<Operator, Error, OperatorOnboarding>({
    mutationFn: (body) => operatorApi.setNewOperator(body),
    onSuccess: () => {
      showNotification('Operator created successfully!', 'success');
    },
    onError: (error) => {
      showNotification(error.message, 'error');
    },
  });
};
