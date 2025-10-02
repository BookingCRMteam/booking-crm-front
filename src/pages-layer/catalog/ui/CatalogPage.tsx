'use client';

import React, { useEffect } from 'react';

import { Box, CircularProgress, Grid } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { fetchTours } from '@/entities/tour/api/toursApi';
import type { Tours } from '@/entities/tour/model/types';

import { TourCard } from '@/shared/ui';

import { CatalogEmpty } from './CatalogEmpty';

interface CatalogPageProps {
  initialData: Tours;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ initialData }) => {
  const limit = initialData?.meta?.limit ?? 6;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
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
      staleTime: Infinity,
      initialData: {
        pages: [initialData],
        pageParams: [0],
      },
    });

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '200px',
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!initialData || !initialData.data?.length) {
    return <CatalogEmpty />;
  }

  return (
    <>
      <Grid container spacing={3} sx={{ pt: '36px', pb: 5 }}>
        {data?.pages.map((page) =>
          page.data.map((tour) => (
            <Grid key={tour.id} size={{ md: 4 }}>
              <TourCard tour={tour} />
            </Grid>
          )),
        )}
      </Grid>

      <Box ref={ref} sx={{ display: 'flex', justifyContent: 'center' }}>
        {isFetchingNextPage && (
          <Box sx={{ py: 2 }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </>
  );
};
