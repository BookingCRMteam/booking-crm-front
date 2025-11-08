import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { Tours } from '@/entities/tour';

interface UseInfiniteToursCollectionProps {
  initialData: Tours;
  queryKey: (string | number)[];
  queryFn: (params: { limit: number; offset: number }) => Promise<Tours>;
}

export const useInfiniteToursCollection = ({
  initialData,
  queryKey,
  queryFn,
}: UseInfiniteToursCollectionProps) => {
  const limit = initialData?.meta?.limit ?? 6;

  const { data, fetchNextPage, error, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<Tours, Error>({
      queryKey: [...queryKey, limit],
      queryFn: ({ pageParam = 0 }) =>
        queryFn({ limit, offset: pageParam as number }),

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
