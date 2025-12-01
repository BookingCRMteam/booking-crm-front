'use client';

import { useEffect } from 'react';

import { Box, CircularProgress } from '@mui/material';

import { useOperatorQuery } from '@/entities/operator';

import { useBookingStore } from '@/shared/store';

import { OperatorMyTours } from '../OperatorMyTours/OperatorMyTours';

export const OperatorMyToursPage = () => {
  const { data: operator, isLoading } = useOperatorQuery();
  const { stopRedirect } = useBookingStore();

  const operatorId = operator?.id;

  useEffect(() => {
    stopRedirect();
  }, [stopRedirect]);

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size={46} />
      </Box>
    );
  }

  if (!operatorId) return null;

  return <OperatorMyTours operatorId={operatorId} />;
};
