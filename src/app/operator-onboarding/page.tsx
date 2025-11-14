import { redirect } from 'next/navigation';

import { OperatorOnboardingPage } from '@/pages-layer/operator-onboarding';

import { authGuard } from '@/features/auth';

import { APP_ROUTE } from '@/shared/constants';

export default async function OperatorOnboarding() {
  const { operator } = await authGuard(APP_ROUTE.OPERATOR_ONBOARDING, [
    'operator',
    'traveler',
  ]);
  if (operator && operator.status && operator.status !== 'rejected') {
    redirect(APP_ROUTE.OPERATOR);
  }
  return <OperatorOnboardingPage />;
}
