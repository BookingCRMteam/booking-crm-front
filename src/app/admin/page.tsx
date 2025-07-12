import { Box, Container, Typography } from '@mui/material';

import Image from 'next/image';

import { withRoleProtection } from '@/shared/lib/auth/withRoleProtection';

export default async function Admin() {
  const session = await withRoleProtection({ requiredRoles: ['admin'] });
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
          Admin
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
          {session.user.picture ? (
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
                {session.user.name?.charAt(0)?.toUpperCase() || 'U'}
              </Typography>
            </Box>
          )}
          <Typography variant="h6" component="p" sx={{ mb: 1 }}>
            name: {session.user.name}
          </Typography>
          <Typography variant="h6" component="p" sx={{ mb: 1 }}>
            email: {session.user.email}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
