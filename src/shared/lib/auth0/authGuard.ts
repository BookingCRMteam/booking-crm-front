import { redirect } from 'next/navigation';

import { userApi } from '@/shared/api/user';
import { User } from '@/shared/types/user';
import { hasAccessToPath } from '@/shared/utils/access';

import { auth0 } from './auth0';

export async function authGuard(requiredPath: string): Promise<User> {
  const session = await auth0.getSession();

  if (!session || !session.user) {
    redirect(`/auth/login?returnTo=${requiredPath}`);
  }

  const accessToken = await auth0.getAccessToken();

  if (!accessToken) {
    console.error(
      'SERVER: Access token not available for user:',
      session.user.sub,
    );
    redirect('/403');
  }

  const user: User = await userApi.getCurrentUser(accessToken.token);
  console.log(user, 'user');
  if (user && !hasAccessToPath(requiredPath, user.role)) {
    redirect('/403');
  }

  return user;
}
