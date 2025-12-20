'use client';

import { useEffect } from 'react';

import { useModalStore } from '@/features/modal';

import { useUserBookingsQuery } from '@/entities/booking';
import { User } from '@/entities/user';

import { useNotificationStore } from '@/shared/store';

export const PaymentReminderListener = ({ user }: { user?: User | null }) => {
  const { open, openModal } = useModalStore();
  const { showNotification } = useNotificationStore();

  const { data: bookings, isLoading } = useUserBookingsQuery({
    status: 'pending_payment',
  });

  useEffect(() => {
    if (isLoading || !bookings?.length || !user) return;

    if (open) return;

    if (typeof window !== 'undefined') {
      const isDismissed = sessionStorage.getItem('payment_reminder_dismissed');

      if (isDismissed) return;

      const firstUnpaidBooking = bookings[0];

      try {
        openModal({
          type: 'payment-reminder-modal',
          payload: {
            bookingId: firstUnpaidBooking.bookingId,
          },
          dismissible: true,
        });
        sessionStorage.setItem('payment_reminder_dismissed', 'true');
      } catch (error) {
        showNotification(
          (error as string) || 'Помилка відкриття модалки',
          'error',
        );
      }
    }
  }, [bookings, isLoading, open, openModal, user]);

  return null;
};
