'use client';

import Link from 'next/link';

import { Button, type ButtonProps, Typography, styled } from '@mui/material';
import { CreditCardIcon } from '@phosphor-icons/react';

import { APP_ROUTE } from '@/shared/constants';

const ReplayButtonWrapper = styled(Button)<ButtonProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  padding: '6px 4px',
  borderRadius: '4px',
  backgroundColor: theme.palette.light[200],
  color: theme.palette.text.primary,
  ...theme.typography.bodySmall,
  textTransform: 'capitalize',
  '&:hover, &:focus-visible': {
    backgroundColor: '#8fd8c7',
  },
  '&:active': {
    backgroundColor: '#6fcab5',
  },
}));

export const ReplayButton = () => {
  return (
    <ReplayButtonWrapper component={Link} href={APP_ROUTE.PROFILE}>
      <CreditCardIcon size={16} />
      <Typography variant="bodySmall">Оплатити</Typography>
    </ReplayButtonWrapper>
  );
};
