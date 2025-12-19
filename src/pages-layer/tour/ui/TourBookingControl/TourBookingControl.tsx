import type { FC } from 'react';

import type { BookingStatus } from '@/entities/booking';

import { RepayBookingButton } from '@/shared/ui';

import { BookingLabel } from '../BookingLabel/BookingLabel';

type TourBookingControlProps = {
  bookingStatus: BookingStatus;
  bookingId: number;
};
export const TourBookingControl: FC<TourBookingControlProps> = ({
  bookingStatus,
  bookingId,
}) => {
  return (
    <>
      {bookingStatus === 'pending_payment' && (
        <RepayBookingButton bookingId={bookingId} />
      )}
      {bookingStatus === 'confirmed' && <BookingLabel label="Заброньовано" />}
      {bookingStatus === 'expired' && <BookingLabel label="Скасовано" />}
    </>
  );
};
