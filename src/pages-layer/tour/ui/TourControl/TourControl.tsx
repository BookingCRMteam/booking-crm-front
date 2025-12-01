'use client';

import { type FC, useCallback, useEffect, useMemo } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Box, Typography, styled } from '@mui/material';

import { BookingButton } from '@/features/booking';

import { useUserQuery } from '@/entities/user';

import { useBookingStore } from '@/shared/store';
import {
  DateDisplay,
  LocationDisplay,
  OperatorLink,
  PriceDisplay,
} from '@/shared/ui';

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
  const isOperator = user?.role === 'operator';
  const isTraveler = user?.role === 'traveler';

  const searchParams = useSearchParams();
  const openBooking = searchParams.get('openBooking') === 'true';

  const { openAuthPopover, openBookingModal } = useBookingStore();
  const router = useRouter();

  const tourData = useMemo(
    () => ({ tourId, title, price, countryAndCity, date }),
    [tourId, title, price, countryAndCity, date],
  );

  useEffect(() => {
    if (!user) return;

    if (isTraveler && openBooking) {
      openBookingModal(tourData);
    }

    const url = new URL(window.location.href);
    url.searchParams.delete('openBooking');
    router.replace(url.toString());
  }, [user, isTraveler, tourData, router, openBooking, openBookingModal]);

  const handleBookingUserClick = useCallback(() => {
    if (isLoading) return;

    if (user === null) {
      openAuthPopover();
      return;
    }
    if (isTraveler) {
      openBookingModal(tourData);
    }
  }, [
    isLoading,
    user,
    isTraveler,
    tourData,
    openAuthPopover,
    openBookingModal,
  ]);

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
