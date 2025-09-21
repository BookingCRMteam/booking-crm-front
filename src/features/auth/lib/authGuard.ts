import { redirect } from 'next/navigation';

import { APP_ROUTE } from '@/shared/constants';
import type { UserRole } from '@/shared/types';

import type { UserWithToken } from '../model/types';
import { getUser } from './getUser';

export async function authGuard(
  requiredPath: APP_ROUTE,
  allowedRoles: UserRole[],
): Promise<UserWithToken> {
  const userWithToken = await getUser();
  if (!userWithToken || !userWithToken.user) {
    redirect(`/auth/login?returnTo=${requiredPath}`);
  }
  if (!allowedRoles.includes(userWithToken.user.role)) {
    redirect('/403');
  }

  return userWithToken;
}
