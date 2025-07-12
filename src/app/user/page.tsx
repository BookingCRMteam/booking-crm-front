import { Box, Container, Typography } from '@mui/material';

import Image from 'next/image';

import { withRoleProtection } from '@/shared/lib/auth/withRoleProtection';

export default async function User() {
  const session = await withRoleProtection({ requiredRoles: ['user'] });
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
          User
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
            src={session.user.picture ?? ''}
            alt="Profile"
            width={80}
            height={80}
            style={{ borderRadius: '50%' }}
          />
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            name: {session.user.name}
          </Typography>
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            email: {session.user.email}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
