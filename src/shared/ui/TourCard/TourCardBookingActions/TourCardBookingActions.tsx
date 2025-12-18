import type { FC } from 'react';

import { Button } from '@mui/material';

import type { BookingStatus } from '@/entities/booking';

import { RepayBookingButton } from '@/shared/ui';

import { BookingButton } from '../../BookingButton/BookingButton';

type TourCardBookingActionsProps = {
  bookingStatus: BookingStatus;
  bookingId: number;
};

export const TourCardBookingActions: FC<TourCardBookingActionsProps> = ({
  bookingStatus,
  bookingId,
}) => {
  return (
    <>
      {bookingStatus === 'confirmed' && <BookingButton bookingId={bookingId} />}
      {bookingStatus === 'pending_payment' && (
        <RepayBookingButton bookingId={bookingId} />
      )}
      {bookingStatus === 'expired' && (
        <Button
          variant="contained"
          color="error"
          size="large"
          fullWidth
          disabled
        >
          Скасовано
        </Button>
      )}
    </>
  );
};
