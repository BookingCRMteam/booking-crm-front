'use client';

import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  BookingPaymentResponse,
  PaymentModalData,
} from '@/entities/booking/model/type';

import { PaymentModal } from '../PaymentModal/PaymentModal';

type BookingStatusListenerProps = {
  countryAndCity: string;
  date: string;
};

export const BookingStatusListener = ({
  countryAndCity,
  date,
}: BookingStatusListenerProps) => {
  const params = useSearchParams();
  const router = useRouter();

  const status = params.get('status');
  const bookingId = params.get('bookingId');

  const [modalData, setModalData] = useState<PaymentModalData | null>(null);

  useEffect(() => {
    if (!status || !bookingId) return;

    const fetchData = () => {
      const bookingData: BookingPaymentResponse = {
        status: 'success',
        booking: {
          id: 215,
          userId: 19,
          firstPersonName: 'Олена',
          firstPersonSurname: 'Петренко',
          secondPersonName: 'Іван',
          secondPersonSurname: 'Іванов',
          phone: '0501122333',
          email: 'example@gmail.com',
          tourId: 160,
          totalPrice: '50000',
          paymentLink: '#',
        },
      };

      setModalData({
        ...bookingData,
        tour: {
          date,
          countryAndCity,
        },
      });
    };

    fetchData();
  }, [status, bookingId, router, date, countryAndCity]);

  return (
    <>
      {modalData && (
        <PaymentModal
          status={status}
          data={modalData}
          onClose={() => setModalData(null)}
        />
      )}
    </>
  );
};
