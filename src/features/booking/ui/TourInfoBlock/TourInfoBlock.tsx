'use client';

import { Box, Typography, styled } from '@mui/material';

import { useBookingStore } from '@/shared/store';
import { DateDisplay, LocationDisplay, PriceDisplay } from '@/shared/ui';

const TourContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  alignItems: 'center',
});

const InfoContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'center',
});

export const TourInfoBlock = () => {
  const { tourData } = useBookingStore();

  if (!tourData) return null;

  const { title, price, countryAndCity, date } = tourData;

  return (
    <TourContainer>
      <Typography variant="h3">{title}</Typography>
      <InfoContainer>
        <LocationDisplay location={countryAndCity} />
        <DateDisplay date={date} />
        <PriceDisplay price={price} />
      </InfoContainer>
    </TourContainer>
  );
};
