import { Box, Button, Container, Typography } from '@mui/material';

import Link from 'next/link';

import CheckStatusApi from '@/features/health/components/CheckStatusApi';

import { APP_ROUTE } from '@/shared/constants/routes';

export default async function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Hello Booking CRM team! &#128512;
        </Typography>
        <Button
          variant="contained"
          component={Link}
          color="secondary"
          href={APP_ROUTE.TOURS}
        >
          Знайти
        </Button>
        <CheckStatusApi />
      </Box>
    </Container>
  );
}
