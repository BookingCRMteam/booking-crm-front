import { redirect } from 'next/navigation';

import { Container } from '@mui/material';

import { authGuard } from '@/features/auth';
import { OperatorOnboardingForm } from '@/features/operator-onboarding';

import { APP_ROUTE } from '@/shared/constants';

export default async function OperatorOnboarding() {
  const { operator } = await authGuard(APP_ROUTE.OPERATOR_ONBOARDING, [
    'operator',
    'traveler',
  ]);
  if (operator && operator.status && operator.status !== 'rejected') {
    redirect(APP_ROUTE.OPERATOR);
  }
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <OperatorOnboardingForm />
    </Container>
  );
}
