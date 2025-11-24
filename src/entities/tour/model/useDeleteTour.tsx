import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { deleteTour } from '../api/toursApi';
import type { Tours } from '../index';

export const useDeleteTour = (operatorId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tourId: number) => deleteTour(tourId),

    onMutate: async (tourId: number) => {
      await queryClient.cancelQueries({
        queryKey: ['tours', 'operator', operatorId],
      });

      const previousData = queryClient.getQueryData<InfiniteData<Tours>>([
        'tours',
        'operator',
        operatorId,
      ]);

      if (previousData) {
        const newPages = previousData.pages.map((page) => ({
          ...page,
          data: page.data.filter((tour) => tour.id !== tourId),
        }));

        queryClient.setQueryData<InfiniteData<Tours>>(
          ['tours', 'operator', operatorId],
          { ...previousData, pages: newPages },
        );
      }

      return { previousData };
    },

    onError: (_err, _tourId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<InfiniteData<Tours>>(
          ['tours', 'operator', operatorId],
          context.previousData,
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['tours', 'operator', operatorId],
      });
    },
  });
};
