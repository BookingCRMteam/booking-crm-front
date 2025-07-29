import { Box, Container, Typography } from '@mui/material';

import OperatorRegistrationForm from '@/features/auth/OperatorRegistrationForm/OperatorRegistrationForm';

export default async function ContinueSignup() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Продовження реєстрації туроператора
        </Typography>
        <OperatorRegistrationForm />
      </Box>
    </Container>
  );
}
