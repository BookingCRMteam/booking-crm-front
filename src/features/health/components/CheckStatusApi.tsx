'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useQuery } from '@tanstack/react-query';

import { getStatusApi } from '@/features/health/api/getStatusApi';

import { useStore } from '@/store';

export default function CheckStatusApi() {
  const { showNotification } = useStore();
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
    try {
      const result = await refetch();

      if (result.isSuccess && result.data) {
        showNotification(`API Status: ${result.data}`, 'success');
      } else if (result.isError) {
        throw result.error;
      }
    } catch (err) {
      if (err instanceof Error) {
        showNotification(`Помилка API: ${err.message}`, 'error');
      } else {
        showNotification('Невідома помилка', 'error');
      }
    } finally {
    }
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
    </Box>
  );
}
