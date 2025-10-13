'use client';

import { type FC, useRef } from 'react';

import { Button } from '@mui/material';

import { TourBookingInfo } from '@/entities/tour/model/types';

import { useBookingModal } from '../../lib/useBookingModal';
import { BookingAuthPopover } from '../BookingAuthPopover/BookingAuthPopover';
import { BookingFormModal } from '../BookingFormModal/BookingFormModal';

type BookingButtonProps = {
  isAvailable?: boolean;
  tourData: TourBookingInfo;
};

export const BookingButton: FC<BookingButtonProps> = ({
  isAvailable = false,
  tourData,
}) => {
  const {
    isAuthModalOpen,
    isBookingModalOpen,
    handleOpen,
    handleAuth,
    handleCloseAuth,
    handleCloseBooking,
  } = useBookingModal();

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        ref={buttonRef}
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        disabled={!isAvailable}
        onClick={handleOpen}
        sx={{ '&.Mui-disabled': { color: 'common.white' } }}
      >
        Забронювати
      </Button>

      <BookingAuthPopover
        open={isAuthModalOpen}
        anchorEl={buttonRef.current}
        onClose={handleCloseAuth}
        onAuth={handleAuth}
      />

      <BookingFormModal
        open={isBookingModalOpen}
        onClose={handleCloseBooking}
        tourData={tourData}
      />
    </>
  );
};
