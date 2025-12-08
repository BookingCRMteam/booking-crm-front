'use client';

import type { FC } from 'react';

import Link from 'next/link';

import { Box, Button, TextField, Typography } from '@mui/material';

import { APP_ROUTE } from '@/shared/constants';

export type OperatorRejectionProps = {
  message: string;
};

export const OperatorRejection: FC<OperatorRejectionProps> = ({ message }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Typography variant="h3" component="h3" color="error">
        Вашу заявку відхилено!
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Typography variant="bodyLarge" component="p">
          Ваш статус “Туроператор” не підтверджено через:
        </Typography>
        <TextField
          value={message}
          disabled
          multiline
          minRows={1}
          fullWidth
          variant="outlined"
        />
      </Box>
      <Button
        color="primary"
        variant="contained"
        size="large"
        component={Link}
        href={APP_ROUTE.OPERATOR_ONBOARDING}
        sx={{ width: 'fit-content' }}
      >
        Подати нові дані
      </Button>
    </Box>
  );
};
