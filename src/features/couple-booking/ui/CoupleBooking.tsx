'use client';

import { Box, Typography } from '@mui/material';

import { fetchTours, useInfiniteToursCollection } from '@/entities/tour';

import { ToursCollection } from '@/shared/ui';

import { CoupleBookingEmpty } from './CoupleBookingEmpty';

export const CoupleBooking = () => {
  // TODO: change queryFn to fetch couple bookings
  const props = useInfiniteToursCollection({
    queryKey: ['tours', 'my-bookings'],
    queryFn: fetchTours,
  });

  const isBookingEmpty = !props.data?.pages?.[0]?.data?.length || props.error;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
      data-testid="couple-profile-editing"
    >
      <Typography align="center" variant="h2" component="h2" gutterBottom>
        Наші бронювання
      </Typography>
      {isBookingEmpty ? (
        <CoupleBookingEmpty />
      ) : (
        <ToursCollection {...props} variantTourCard="couple-booking" />
      )}
    </Box>
  );
};
