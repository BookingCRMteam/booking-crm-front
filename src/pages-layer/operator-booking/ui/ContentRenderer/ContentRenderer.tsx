'use client';

import { CircularProgress } from '@mui/material';

import { useGetOperatorPaidBookingsQuery } from '@/entities/operator';

import { ErrorLoading } from '@/shared/ui';

import { OperatorBookingEmpty } from '../OperatorBookingEmpty/OperatorBookingEmpty';
import { OperatorBookingItems } from '../OperatorBookingItems/OperatorBookingItems';

export const ContentRenderer = () => {
  const {
    data: bookings,
    isLoading,
    isError,
    isSuccess,
  } = useGetOperatorPaidBookingsQuery();

  if (isLoading) {
    return <CircularProgress size={50} />;
  }

  if (isError) {
    return <ErrorLoading message="Помилка завантаження бронювань" />;
  }

  if (isSuccess && bookings && bookings.length > 0) {
    return <OperatorBookingItems bookings={bookings} />;
  }

  return <OperatorBookingEmpty />;
};
