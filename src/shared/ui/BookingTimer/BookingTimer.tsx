'use client';

import { type FC, useEffect, useState } from 'react';

import { Box, Skeleton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useGetBookingExpirationQuery } from '@/entities/booking/model/useGetBookingExpiration';

import { getMinutesRemaining, getPluralMinutes } from '@/shared/utils';

interface BookingTimerProps {
  bookingId: number;
  variant?: 'card' | 'modal';
}

const TimerWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '2px 4px',
  borderRadius: '4px',
  background: theme.palette.common.white,
  color: theme.palette.error.main,
  zIndex: 2,
  position: 'absolute',
  top: 20,
  right: 16,
}));

export const BookingTimer: FC<BookingTimerProps> = ({
  bookingId,
  variant = 'card',
}) => {
  const { data, isLoading, error } = useGetBookingExpirationQuery(bookingId);

  const [minutesLeft, setMinutesLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!data?.expiresAt || data.isExpired) return;

    const updateTimer = () => {
      const mins = getMinutesRemaining(data.expiresAt);
      if (mins <= 0) {
        setMinutesLeft(0);
        return false;
      }
      setMinutesLeft(mins);
      return true;
    };

    if (!updateTimer()) return;

    const intervalId = setInterval(() => {
      if (!updateTimer()) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [data]);

  if (isLoading)
    return (
      <Skeleton width={80} height={20} data-testid="booking-timer-skeleton" />
    );
  if (
    error ||
    !data ||
    data.isExpired ||
    minutesLeft === null ||
    minutesLeft <= 0
  )
    return null;

  const minutesWord = getPluralMinutes(minutesLeft);
  return (
    <>
      {variant === 'card' && (
        <TimerWrapper>
          <Typography variant="bodySmall">
            {minutesLeft} {minutesWord}
          </Typography>
        </TimerWrapper>
      )}
      {variant === 'modal' && (
        <Typography variant="bodyLarge" fontWeight={700}>
          {minutesLeft} {minutesWord}
        </Typography>
      )}
    </>
  );
};
