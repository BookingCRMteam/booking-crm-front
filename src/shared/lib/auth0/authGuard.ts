import { redirect } from 'next/navigation';

import { APP_ROUTE } from '@/shared/constants/routes';
import { UserRole } from '@/shared/types/roles';
import { User } from '@/shared/types/user';

import { getUser } from './getUser';

/**
 * Returns a user object.
 *
 * @param requiredPath - The path to the required endpoint.
 * @param allowedRoles - The allowed roles for the user.
 *
 * @returns User object.
 */
export async function authGuard(
  requiredPath: APP_ROUTE,
  allowedRoles: UserRole[],
): Promise<User> {
  const userWithToken = await getUser();

  if (!userWithToken) {
    redirect(`/auth/login?returnTo=${requiredPath}`);
  }

  if (!allowedRoles.includes(userWithToken.user.role)) {
    redirect('/403');
  }

  return userWithToken.user;
}
