import { Box, Container, Typography } from '@mui/material';

import { Button } from '@/components/Button/Button';

import CheckStatusApi from '@/features/health/components/CheckStatusApi';

import { AUTH_URL } from '@/shared/constants/auth';
import { auth0 } from '@/shared/lib/auth/auth0';

export default async function Home() {
  const session = await auth0.getSession();
  const isActiveUser = !!session?.user;

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
          label="Login"
          variant="contained"
          disabled={isActiveUser}
          color="warning"
          component="a"
          href={AUTH_URL.LOGIN}
        />
        <CheckStatusApi />
      </Box>
    </Container>
  );
}
