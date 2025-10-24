'use client';

import { useRef } from 'react';

import { Button } from '@mui/material';

import { BookingAuthPopover } from '../BookingAuthPopover/BookingAuthPopover';
import { BookingModal } from '../BookingModal/BookingModal';
import { BookingOperatorPopover } from '../BookingOperatorPopover/BookingOperatorPopover';

type BookingButtonProps = {
  isAvailable: boolean;
  onClick: () => void;
};

export const BookingButton = ({ isAvailable, onClick }: BookingButtonProps) => {
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
        onClick={onClick}
        aria-label="Забронювати"
        sx={{ '&.Mui-disabled': { color: 'common.white' } }}
      >
        Забронювати
      </Button>

      <BookingAuthPopover anchorEl={buttonRef.current} />
      <BookingOperatorPopover anchorEl={buttonRef.current} />
      <BookingModal />
    </>
  );
};
