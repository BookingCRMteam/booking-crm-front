import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

interface UseInfiniteCollectionProps<TResponse> {
  initialData?: TResponse;
  queryKey: (string | number)[];
  queryFn: (params: { limit: number; offset: number }) => Promise<TResponse>;
}

export interface PaginationMeta {
  limit: number;
  offset: number;
  total: number | string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export const useInfiniteToursCollection = <
  TItem,
  TResponse extends PaginatedResponse<TItem>,
>({
  initialData,
  queryKey,
  queryFn,
}: UseInfiniteCollectionProps<TResponse>) => {
  const limit = initialData?.meta?.limit ?? 6;

  const {
    data,
    fetchNextPage,
    error,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<TResponse, Error, InfiniteData<TResponse>>({
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
    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [0],
        }
      : undefined,
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

  return { data, isFetchingNextPage, ref, error, isLoading };
};
