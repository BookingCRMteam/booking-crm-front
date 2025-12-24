'use client';

import { type FC, useCallback, useEffect, useMemo } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Typography } from '@mui/material';

import { BookingButton } from '@/features/booking';

import { useUserBookingsQuery } from '@/entities/booking';
import { useUserQuery } from '@/entities/user';

import { useBookingStore } from '@/shared/store';
import { RepayBookingButton } from '@/shared/ui';

type TourControlProps = {
  tourId: number;
  title: string;
  price: string;
  countryAndCity: string;
  date: string;
  availableSpots: number;
};

const TourControl: FC<TourControlProps> = ({
  tourId,
  title,
  countryAndCity,
  date,
  price,
  availableSpots,
}) => {
  const isAvailable = availableSpots > 0;

  const { data: user, isLoading } = useUserQuery();
  const { data: bookings } = useUserBookingsQuery({
    status: 'pending_payment',
    skip: !user,
  });

  const bookingPendingPayment = bookings?.data?.find(
    (booking) => booking.tour.id === tourId,
  );

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

    if (openBooking) {
      const url = new URL(window.location.href);
      url.searchParams.delete('openBooking');
      router.replace(url.toString());
    }
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
    <>
      {isOperator && (
        <Typography variant="bodyLarge" component="p" color="error" mb={1}>
          Ви як авторизований туроператор можете тільки переглядати вже створені
          тури
        </Typography>
      )}
      {!bookingPendingPayment && (
        <BookingButton
          userData={user}
          isAvailable={isAvailable}
          onUserClick={handleBookingUserClick}
          isLoading={isLoading}
        />
      )}
      {bookingPendingPayment && (
        <RepayBookingButton bookingId={bookingPendingPayment.bookingId} />
      )}
    </>
  );
};

export default TourControl;
