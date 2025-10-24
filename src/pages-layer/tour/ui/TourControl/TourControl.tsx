'use client';

import type { FC } from 'react';

import { Box, Typography, styled } from '@mui/material';

import { BookingButton } from '@/features/booking';

import { useUserQuery } from '@/entities/user';

import { useBookingStore } from '@/shared/store';
import { DateDisplay, LocationDisplay, PriceDisplay } from '@/shared/ui';

import { AvailabilityBadge } from '../AvailabilityBadge/AvailabilityBadge';
import { OperatorLink } from '../OperatorLink/OperatorLink';

const ControlWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  paddingTop: '20px',
});

const InfoSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '21px',
});

const InfoRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
});

const MetaGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

type TourControlProps = {
  tourId: number;
  title: string;
  price: string;
  countryAndCity: string;
  date: string;
  operator: {
    id: number;
    name: string;
    photo: string | null;
  };
  availableSpots: number;
};

const TourControl: FC<TourControlProps> = ({
  tourId,
  title,
  countryAndCity,
  date,
  price,
  availableSpots,
  operator,
}) => {
  const isAvailable = availableSpots > 0;
  const { data: user } = useUserQuery();
  const { openAuthPopover, openOperatorPopover, openBookingModal } =
    useBookingStore();

  const handleBookingClick = () => {
    const tourData = { tourId, title, price, countryAndCity, date };

    if (!user) {
      openAuthPopover();
      return;
    }
    if (user.role === 'operator') {
      openOperatorPopover();
      return;
    }
    openBookingModal(tourData);
  };

  return (
    <ControlWrapper>
      <Typography
        variant="h2"
        component="h1"
        sx={{ letterSpacing: '-0.01em', lineHeight: '129%' }}
      >
        {title}
      </Typography>
      <InfoSection>
        <InfoRow>
          <MetaGroup>
            <LocationDisplay location={countryAndCity} />
            <DateDisplay date={date} />
          </MetaGroup>
          <AvailabilityBadge availableSpots={availableSpots} />
        </InfoRow>
        <PriceDisplay price={price} />
      </InfoSection>
      <OperatorLink {...operator} />
      <BookingButton isAvailable={isAvailable} onClick={handleBookingClick} />
    </ControlWrapper>
  );
};

export default TourControl;
