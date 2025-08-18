import { Box, Container, Typography } from '@mui/material';

import { getUser } from '@/shared/lib/auth0/getUser';

export default async function Profile() {
  const user = await getUser();
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
          {user && (
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
                {user.user.firstName?.charAt(0)?.toUpperCase() || 'U'}
              </Typography>
            </Box>
          )}
          <Typography variant="h6" component="p" sx={{ mb: 1 }}>
            name: {user && user.user.firstName}
          </Typography>
          <Typography variant="h6" component="p" sx={{ mb: 1 }}>
            email: {user && user.user.email}
          </Typography>
          <Typography variant="h6" component="p" sx={{ mb: 1 }}>
            roles: {user && user.user.role}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
