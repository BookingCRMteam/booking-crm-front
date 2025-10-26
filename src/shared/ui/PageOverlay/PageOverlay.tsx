'use client';

import { Box, CircularProgress } from '@mui/material';

import { useBookingStore } from '@/shared/store';

export const PageOverlay = () => {
  const { isRedirecting } = useBookingStore();

  if (!isRedirecting) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(2px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        pointerEvents: 'all',
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};
