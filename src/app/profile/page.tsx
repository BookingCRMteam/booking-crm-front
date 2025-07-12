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
              {user.picture ? (
                <Image
                  src={user.picture}
                  alt="Profile"
                  width={80}
                  height={80}
                  style={{ borderRadius: '50%' }}
                />
              ) : (
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: 'grey.300',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h4">
                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                  </Typography>
                </Box>
              )}
              <Typography variant="h6" component="p" sx={{ mb: 1 }}>
                name: {user.name}
              </Typography>
              <Typography variant="h6" component="p" sx={{ mb: 1 }}>
                email: {user.email}
              </Typography>
              <Typography variant="h6" component="p" sx={{ mb: 1 }}>
                sub: {user.sub}
              </Typography>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
});
