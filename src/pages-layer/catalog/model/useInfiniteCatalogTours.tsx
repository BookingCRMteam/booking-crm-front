import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { fetchTours } from '@/entities/tour/api/toursApi';
import { Tours } from '@/entities/tour/model/types';

interface UseCatalogPageDataProps {
  initialData: Tours;
}

export const useInfiniteCatalogTours = ({
  initialData,
}: UseCatalogPageDataProps) => {
  const limit = initialData?.meta?.limit ?? 6;

  const { data, fetchNextPage, error, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<Tours, Error>({
      queryKey: ['tours', limit],
      queryFn: ({ pageParam = 0 }) =>
        fetchTours({ limit, offset: pageParam as number }),

      getNextPageParam: (lastPage) => {
        const nextOffset = lastPage.meta.offset + lastPage.meta.limit;
        const total = Number(lastPage.meta.total);
        return nextOffset < total ? nextOffset : undefined;
      },
      initialPageParam: 0,
      staleTime: 1000 * 60 * 2,
      refetchOnWindowFocus: true,
      initialData: {
        pages: [initialData],
        pageParams: [0],
      },
    });
  const { ref } = useInView({
    threshold: 0,
    rootMargin: '400px',
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  return { data, isFetchingNextPage, ref, error };
};
