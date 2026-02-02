'use client';

import { type FC } from 'react';

import { Box, CircularProgress, Grid } from '@mui/material';

import { Tour, ToursCollectionProps } from '@/entities/tour';

import { getTranslation } from '@/shared/lib/translation';
import { ButtonTop, TourCard } from '@/shared/ui';

export const ToursCollection: FC<ToursCollectionProps<Tour>> = ({
  data,
  isFetchingNextPage,
  ref,
  variantTourCard,
  children,
}) => {
  return (
    <>
      <Grid
        container
        spacing={3}
        justifyContent={{ xs: 'center', md: 'start' }}
        sx={{
          width: '100%',
        }}
      >
        {children ??
          data?.pages.map((page) =>
            page.data.map((tour) => (
              <Grid key={tour.id} size={{ md: 4 }}>
                <TourCard
                  id={tour.id}
                  variant={variantTourCard}
                  title={tour.title}
                  availableSpots={tour.availableSpots}
                  price={tour.price}
                  photos={tour.photos}
                  startDate={tour.startDate}
                  endDate={tour.endDate}
                  countryName={getTranslation(tour.country.translations, 'uk')}
                  bookingCount={tour.bookedSpots}
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
      <ButtonTop />
    </>
  );
};
