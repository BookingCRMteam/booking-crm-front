'use client';

import { type FC, useCallback, useMemo } from 'react';

import { Box, Typography, styled } from '@mui/material';

import { BookingButton } from '@/features/booking';

import { useUserQuery } from '@/entities/user';

import { useBookingStore } from '@/shared/store';
import { OperatorLink } from '@/shared/ui';
import { DateDisplay, LocationDisplay, PriceDisplay } from '@/shared/ui';

import { AvailabilityBadge } from '../AvailabilityBadge/AvailabilityBadge';

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
  const { data: user, isLoading } = useUserQuery();
  const { openAuthPopover, openBookingModal } = useBookingStore();

  const isOperator = user?.role === 'operator';

  const tourData = useMemo(
    () => ({ tourId, title, price, countryAndCity, date }),
    [tourId, title, price, countryAndCity, date],
  );

  const handleBookingUserClick = useCallback(() => {
    if (isLoading) return;

    if (user === null) {
      openAuthPopover();
      return;
    }
    if (user?.role === 'traveler') {
      openBookingModal(tourData);
    }
  }, [isLoading, user, tourData, openAuthPopover, openBookingModal]);

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
      <OperatorLink {...operator} variant="page" />

      {isOperator && (
        <Typography variant="bodyLarge" component="p" color="error" mb={1}>
          Ви як авторизований туроператор можете тільки переглядати вже створені
          тури
        </Typography>
      )}

      <BookingButton
        userData={user}
        isAvailable={isAvailable}
        onUserClick={handleBookingUserClick}
        isLoading={isLoading}
      />
    </ControlWrapper>
  );
};

export default TourControl;
