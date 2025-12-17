'use client';

import type { FC } from 'react';

import Link from 'next/link';

import { Button, type ButtonProps, styled } from '@mui/material';

import { APP_ROUTE } from '@/shared/constants';

type ButtonStyledProps = ButtonProps & {
  booking?: boolean;
};

const ButtonStyled = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'booking',
})<ButtonStyledProps>(({ theme, booking }) => ({
  backgroundColor: theme.palette.accent[1],
  boxShadow:
    '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
  color: theme.palette.common.white,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.accent[1],
    boxShadow:
      '0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12)',
    color: theme.palette.common.black,
  },
  '&:focus-visible': {
    backgroundColor: theme.palette.accent[2],
    boxShadow:
      '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12)',
    color: theme.palette.common.black,
  },
  '&:active': {
    backgroundColor: theme.palette.accent[1],
    boxShadow: 'none',
    color: theme.palette.common.black,
  },
  '&:disabled': {
    backgroundColor: theme.palette.gray[800],
    boxShadow: 'none',
    color: theme.palette.common.black,
  },
  ...(booking && {
    '&, &:hover, &:focus-visible, &:active': {
      backgroundColor: theme.palette.accent[1],
      boxShadow:
        '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
      color: theme.palette.common.white,
      cursor: 'default',
    },
  }),
}));

type BookingButtonProps = {
  bookingId: number;
};

export const BookingButton: FC<BookingButtonProps> = ({ bookingId }) => {
  return (
    <ButtonStyled
      variant="contained"
      color="primary"
      size="large"
      fullWidth
      component={Link}
      href={`${APP_ROUTE.PROFILE}/booking/${bookingId}`}
    >
      Заброньовано
    </ButtonStyled>
  );
};
