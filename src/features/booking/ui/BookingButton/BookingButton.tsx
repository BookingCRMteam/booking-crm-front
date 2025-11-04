'use client';

import { useRef } from 'react';

import { useRouter } from 'next/navigation';

import { Button, CircularProgress } from '@mui/material';

import { User } from '@/entities/user';

import { APP_ROUTE } from '@/shared/constants';
import { useBookingStore } from '@/shared/store';

import { BookingAuthPopover } from '../BookingAuthPopover/BookingAuthPopover';
import { BookingModal } from '../BookingModal/BookingModal';

type BookingButtonProps = {
  userData: User | null | undefined;
  isAvailable: boolean;
  isLoading: boolean;
  onUserClick: () => void;
};

export const BookingButton = ({
  userData,
  isAvailable,
  isLoading,
  onUserClick,
}: BookingButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const { isRedirecting, startRedirect } = useBookingStore();

  const isOperator = userData?.role === 'operator';
  const isUserLoading = isLoading || userData === undefined;

  const isDisabled =
    isLoading ||
    isRedirecting ||
    userData === undefined ||
    (!isOperator && !isAvailable);

  function onOperatorClick() {
    startRedirect();
    router.push(APP_ROUTE.OPERATOR);
  }

  return (
    <>
      <Button
        ref={buttonRef}
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        disabled={isDisabled}
        onClick={isOperator ? onOperatorClick : onUserClick}
        aria-label={isOperator ? 'Створити власний тур' : 'Забронювати'}
        sx={{ '&.Mui-disabled': { color: 'common.white' } }}
      >
        {isUserLoading ? (
          <CircularProgress size={24} color="secondary" />
        ) : isOperator ? (
          'Створити власний тур'
        ) : (
          'Забронювати'
        )}
      </Button>

      <BookingAuthPopover anchorEl={buttonRef.current} />
      <BookingModal />
    </>
  );
};
