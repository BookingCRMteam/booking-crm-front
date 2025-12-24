'use client';

import { Box, Typography, styled } from '@mui/material';
import { CreditCardIcon } from '@phosphor-icons/react';

const ReplayLabelWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  padding: '6px 4px',
  borderRadius: '4px',
  backgroundColor: theme.palette.light[200],
  color: theme.palette.text.primary,
}));

export const ReplayLabel = () => {
  return (
    <ReplayLabelWrapper>
      <CreditCardIcon size={16} />
      <Typography variant="bodySmall">Оплатити</Typography>
    </ReplayLabelWrapper>
  );
};
