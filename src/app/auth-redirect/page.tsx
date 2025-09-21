import { redirect } from 'next/navigation';

import { getUser } from '@/features/auth';

import { APP_ROUTE, AUTH_URL } from '@/shared/constants';

export default async function AuthRedirectPage({
  searchParams,
}: {
  searchParams: Promise<{ authFlow: string }>;
}) {
  const userWithToken = await getUser();

  if (!userWithToken || !userWithToken.user) {
    redirect(AUTH_URL.LOGIN);
  }

  const {
    user: { role },
  } = userWithToken;
  const { authFlow } = await searchParams;

  if (authFlow === 'onboarding' && role === 'traveler') {
    redirect(APP_ROUTE.OPERATOR_ONBOARDING);
  }

  if (role === 'traveler') {
    redirect(APP_ROUTE.CATALOG);
  }

  if (role === 'operator') {
    redirect(APP_ROUTE.OPERATOR);
  }

  redirect(APP_ROUTE.HOME);
}
