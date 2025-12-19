'use client';

import { type FC, useState } from 'react';

import { Button, ButtonProps } from '@mui/material';

import { submitLiqpayForm } from '@/features/booking/utils/submitLiqpayForm';

import { createRepayLink } from '@/entities/booking';

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

  const handleRepayBooking = async () => {
    // TODO: додати обробку помилок
    setLoading(true);
    const booking = await createRepayLink(bookingId);
    submitLiqpayForm(booking.paymentLink);
    setLoading(false);
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
