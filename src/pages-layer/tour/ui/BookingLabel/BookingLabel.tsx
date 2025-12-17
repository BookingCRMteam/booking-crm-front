'use client';

import type { FC } from 'react';

import { Box, Typography, styled } from '@mui/material';

const LabelRoot = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.accent[1],
  boxShadow:
    '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
  color: theme.palette.common.white,
  width: '100%',
  padding: '8px 22px',
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textTransform: 'uppercase',
  fontWeight: 500,
  fontSize: '0.9375rem',
  lineHeight: 1.75,
  letterSpacing: '0.02857em',
  cursor: 'default',
  userSelect: 'none',
}));

export const BookingLabel: FC = () => {
  return (
    <LabelRoot>
      <Typography
        variant="buttonPrimary"
        textTransform="capitalize"
        component="p"
      >
        Заброньовано
      </Typography>
    </LabelRoot>
  );
};
