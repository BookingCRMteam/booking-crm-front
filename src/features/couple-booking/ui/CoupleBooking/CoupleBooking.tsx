'use client';

import { Box, CircularProgress, Grid, Typography } from '@mui/material';

import { useUserBookingsQuery } from '@/entities/booking';

import { TourCard } from '@/shared/ui';

import { CoupleBookingEmpty } from '../CoupleBookingEmpty/CoupleBookingEmpty';

export const CoupleBooking = () => {
  const { data: bookings, isLoading } = useUserBookingsQuery();
  const isBookingEmpty = !bookings?.length;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
      }}
      data-testid="couple-booking"
    >
      <Typography align="center" variant="h2" component="h2" gutterBottom>
        Наші бронювання
      </Typography>
      {isLoading && <CircularProgress />}
      {!isLoading && isBookingEmpty && <CoupleBookingEmpty />}
      {!isLoading && !isBookingEmpty && (
        <Grid container spacing={3}>
          {bookings?.map(({ tour, bookingId, bookingPrice, status }) => (
            <Grid key={bookingId} size={{ xs: 12, sm: 6, md: 4 }}>
              <TourCard
                id={tour.id}
                variant="booking"
                title={tour.title}
                availableSpots={tour.availableSpots}
                price={bookingPrice}
                photos={tour.photos}
                startDate={tour.startDate}
                endDate={tour.endDate}
                countryName={tour.country.name}
                operator={{
                  id: tour.operator.id,
                  name:
                    `${tour.operator.firstName || ''} ${tour.operator.lastName || ''}`.trim() ||
                    'Unknown Operator',
                  photo: tour.operator.photo,
                }}
                bookingId={bookingId}
                bookingStatus={status}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
