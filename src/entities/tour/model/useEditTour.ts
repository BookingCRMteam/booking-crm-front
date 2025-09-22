import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editTour } from '../api/toursApi';

export const useEditTour = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, FormData>({
    mutationFn: (formData: FormData) => editTour(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
      queryClient.invalidateQueries({ queryKey: ['tour', id] });
    },
    onError: (error: unknown) => {
      console.error('Edit tour error:', error);
    },
  });
};
