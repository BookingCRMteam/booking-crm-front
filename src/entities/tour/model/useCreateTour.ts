import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTour } from '../api/toursApi';

export const useCreateTour = () => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, FormData>({
    mutationFn: (data: FormData) => createTour(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
    onError: (error: unknown) => {
      console.error('Create tour error:', error);
    },
  });
};
