import { Box, Container, Typography } from '@mui/material';

import Image from 'next/image';

import { auth0 } from '@/shared/lib/auth/auth0';

export default async function Tourist() {
  const session = await auth0.getSession();
  console.log(session);
  return (
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
          Tourist
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
          {session && session.user.picture ? (
            <Image
              src={session.user.picture}
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
                {(session && session.user.name?.charAt(0)?.toUpperCase()) ||
                  'U'}
              </Typography>
            </Box>
          )}
          <Typography variant="h6" component="p" sx={{ mb: 1 }}>
            name: {session && session.user.name}
          </Typography>
          <Typography variant="h6" component="p" sx={{ mb: 1 }}>
            email: {session && session.user.email}
          </Typography>
          <Typography variant="h6" component="p" sx={{ mb: 1 }}>
            roles: {session && session.user.roles}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
