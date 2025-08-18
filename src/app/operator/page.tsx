import { Box, Container, Typography } from '@mui/material';

import { authGuard } from '@/shared/lib/auth0/authGuard';

export default async function Operator() {
  const user = await authGuard('/operator');
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
          Operator
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="body1" component="p">
            First name: {user.firstName}
          </Typography>
          <Typography variant="body1" component="p">
            Last name: {user.lastName}
          </Typography>
          <Typography variant="body1" component="p">
            Email: {user.email}
          </Typography>
          <Typography variant="body1" component="p">
            {user.phone}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
