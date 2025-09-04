'use client';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Box, Container } from '@mui/material';

import OperatorOnboardingForm from '@/features/operator/OperatorOnboardingForm/OperatorOnboardingForm';
import { useOperatorOnboarding } from '@/features/operator/OperatorOnboardingForm/useOperatorOnboarding';

import { APP_ROUTE } from '@/shared/constants/routes';

export default withPageAuthRequired(
  function OperatorOnboarding() {
    const props = useOperatorOnboarding();
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
          <OperatorOnboardingForm {...props} />
        </Box>
      </Container>
    );
  },
  { returnTo: APP_ROUTE.OPERATOR_ONBOARDING },
);
