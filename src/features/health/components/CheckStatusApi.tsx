'use client';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { useQuery } from '@tanstack/react-query';

import React, { useState } from 'react';

import { getStatusApi } from '@/features/health/api/getStatusApi';

/**
 * Renders a UI component that allows users to check the status of an API and displays the result in a snackbar alert.
 *
 * Provides a button to trigger the API status check and shows a success or error message based on the API response.
 */
export default function CheckStatusApi() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'error' | 'info'
  >('info');

  const { refetch, isFetching } = useQuery<string, Error>({
    queryKey: ['health'],
    queryFn: getStatusApi,
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const handleCheckApi = async () => {
    setSnackbarOpen(false);

    try {
      const result = await refetch();

      if (result.isSuccess && result.data) {
        setSnackbarMessage(`API Status: ${result.data}`);
        setSnackbarSeverity('success');
      } else if (result.isError) {
        throw result.error;
      }
    } catch (err) {
      if (err instanceof Error) {
        setSnackbarMessage(`Помилка API: ${err.message}`);
      } else {
        setSnackbarMessage('Невідома помилка');
      }
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        mt: 4,
        p: 1,
        gap: 2,
      }}
    >
      <Button
        variant="contained"
        onClick={handleCheckApi}
        disabled={isFetching}
        loading={isFetching}
        loadingPosition="end"
      >
        Check API Status
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
