import { redirect } from 'next/navigation';

import { AUTH_URL } from '@/shared/constants/auth';
import { APP_ROUTE } from '@/shared/constants/routes';
import { getUser } from '@/shared/lib/auth0/getUser';

export default async function AuthRedirectPage() {
  const userWithToken = await getUser();
  if (!userWithToken) {
    redirect(AUTH_URL.LOGIN);
  }

  const role = userWithToken.user.role;
  if (role === 'traveler') {
    redirect(APP_ROUTE.CATALOG);
  }
  if (role === 'operator') {
    redirect(APP_ROUTE.OPERATOR);
  }

  redirect(APP_ROUTE.HOME);
}
