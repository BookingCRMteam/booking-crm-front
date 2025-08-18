import { Box, Container, Typography } from '@mui/material';

import OperatorOnboardingForm from '@/features/operator/OperatorOnboardingForm/OperatorOnboardingForm';

export default function OperatorOnboarding() {
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
          Сторінка заповнення профілю
        </Typography>
        <OperatorOnboardingForm />
      </Box>
    </Container>
  );
}
