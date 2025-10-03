'use client';

import { Box, CircularProgress, Grid } from '@mui/material';

import type { Tours } from '@/entities/tour/model/types';

import { TourCard } from '@/shared/ui';

import { useInfiniteCatalogTours } from '../model/useInfiniteCatalogTours';
import { CatalogEmpty } from './CatalogEmpty';

interface CatalogPageProps {
  initialData: Tours;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ initialData }) => {
  const { data, isFetchingNextPage, ref, error } = useInfiniteCatalogTours({
    initialData,
  });

  if (!data?.pages?.[0]?.data?.length || error) {
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
