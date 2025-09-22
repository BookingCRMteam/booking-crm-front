import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTour } from '../api/toursApi';
import { BackendTour } from './types';

export const useCreateTour = () => {
  const queryClient = useQueryClient();

  return useMutation<BackendTour, unknown, FormData>({
    mutationFn: (data: FormData) => createTour(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
    onError: (error: unknown) => {
      console.error('Create tour error:', error);
    },
  });
};
