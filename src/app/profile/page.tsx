'use client';

import { useUser } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Box, Container } from '@mui/material';
import Typography from '@mui/material/Typography';

import Image from 'next/image';

export default withPageAuthRequired(function Profile() {
  const { user, isLoading } = useUser();
  console.log(user);
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
              Profile
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <Image
                src={user.picture ?? ''}
                alt="Profile"
                width={80}
                height={80}
                style={{ borderRadius: '50%' }}
              />
              <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                name: {user.name}
              </Typography>
              <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                email: {user.email}
              </Typography>
              <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                sub: {user.sub}
              </Typography>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
});
