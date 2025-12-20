'use client';

import { type FC, useState } from 'react';

import { Button, ButtonProps } from '@mui/material';

import { submitLiqpayForm } from '@/features/booking/utils/submitLiqpayForm';

import { createRepayLink } from '@/entities/booking';

import { useNotificationStore } from '@/shared/store/notificationSlice';

type RepayBookingButtonProps = ButtonProps & {
  bookingId: number;
  buttonTitle?: string;
};

export const RepayBookingButton: FC<RepayBookingButtonProps> = ({
  bookingId,
  buttonTitle = 'Продовжити оплату',
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotificationStore();

  const handleRepayBooking = async () => {
    setLoading(true);
    try {
      const booking = await createRepayLink(bookingId);
      submitLiqpayForm(booking.paymentLink);
    } catch (error) {
      showNotification((error as string) || 'Помилка оплати', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      fullWidth
      onClick={handleRepayBooking}
      disabled={loading}
      {...props}
    >
      {buttonTitle}
    </Button>
  );
};
