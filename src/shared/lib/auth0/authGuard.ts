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

  const accessToken = session.tokenSet.accessToken;
  if (!accessToken) {
    redirect(`/auth/login?returnTo=${requiredPath}`);
  }

  let user: User;
  try {
    user = await userApi.getCurrentUser(accessToken);
  } catch (err) {
    console.error(err);
    redirect(`/auth/login?returnTo=${requiredPath}`);
  }

  if (!hasAccessToPath(requiredPath, user.role)) {
    redirect('/403');
  }

  return user;
}
