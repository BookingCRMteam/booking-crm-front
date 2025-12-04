'use client';

import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { PaymentModal } from '@/features/booking';

import { BookingPaymentResponse, getBookingById } from '@/entities/booking';

import { logger } from '@/shared/lib/logger';

type BookingStatusListenerProps = {
  tourId: number;
};

export const BookingStatusListener = ({
  tourId,
}: BookingStatusListenerProps) => {
  const params = useSearchParams();
  const router = useRouter();

  const bookingId = Number(params.get('bookingId'));

  const [modalData, setModalData] = useState<BookingPaymentResponse | null>(
    null,
  );

  useEffect(() => {
    if (!bookingId) return;

    const fetchData = async () => {
      try {
        const bookingData = await getBookingById(tourId, bookingId);
        setModalData(bookingData);

        const url = new URL(window.location.href);
        url.searchParams.delete('success');
        url.searchParams.delete('bookingId');
        router.replace(url.toString());
      } catch (err: unknown) {
        logger.error('Failed to fetch booking data:', err);
      }
    };

    fetchData();
  }, [tourId, bookingId, router]);

  return (
    <>
      {modalData && (
        <PaymentModal data={modalData} onClose={() => setModalData(null)} />
      )}
    </>
  );
};
