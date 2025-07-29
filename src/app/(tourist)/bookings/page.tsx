'use client';

import { useUser } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Box, Container } from '@mui/material';
import Typography from '@mui/material/Typography';

export default withPageAuthRequired(function Bookings() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user && (
        <Container maxWidth="lg">
          <Box
            sx={{
              my: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '64px',
            }}
          >
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              My Bookings
            </Typography>
          </Box>
        </Container>
      )}
    </>
  );
});
