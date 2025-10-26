'use client';

import { Box, CircularProgress, Grid } from '@mui/material';

import { TourCard } from '@/shared/ui';

import { CatalogPageProps } from '../model/types';
import { CatalogEmpty } from './CatalogEmpty';

export const CatalogPagePure: React.FC<CatalogPageProps> = ({
  data,
  error,
  isFetchingNextPage,
  ref,
}) => {
  if (!data?.pages?.[0]?.data?.length || error) {
    return <CatalogEmpty />;
  }
  return (
    <>
      <Grid container spacing={3} sx={{ pt: '36px', pb: 5 }}>
        {data?.pages.map((page) =>
          page.data.map((tour) => (
            <Grid key={tour.id} size={{ md: 4 }}>
              <TourCard
                id={tour.id}
                title={tour.title}
                availableSpots={tour.availableSpots}
                price={tour.price}
                photos={tour.photos}
                startDate={tour.startDate}
                endDate={tour.endDate}
                countryName={tour.country.translations[0].name}
                operator={{
                  id: tour.operator.id,
                  name: `${tour.operator.firstName} ${tour.operator.lastName}`,
                  photo: tour.operator.photo,
                }}
              />
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
