import { redirect } from 'next/navigation';

import { APP_ROUTE } from '@/shared/constants/routes';

import { auth0 } from './auth0';

interface RoleOptions {
  requiredRoles: string[];
  redirectPath?: string;
}

export async function withRoleProtection(
  options: RoleOptions = { requiredRoles: [], redirectPath: APP_ROUTE.HOME },
) {
  const session = await auth0.getSession();

  if (!session || !session.user) {
    redirect(options.redirectPath || APP_ROUTE.HOME);
  }

  const userRoles = session.user['roles'] as string[] | undefined;

  if (!userRoles || userRoles.length === 0) {
    if (options.requiredRoles.length > 0) {
      redirect(options.redirectPath || APP_ROUTE.HOME);
    }
  }

  if (options.requiredRoles.length > 0) {
    const hasRequiredRole = options.requiredRoles.some((requiredRole) =>
      userRoles?.some(
        (userRole) => userRole.toLowerCase() === requiredRole.toLowerCase(),
      ),
    );

    if (!hasRequiredRole) {
      redirect(options.redirectPath || APP_ROUTE.HOME);
    }
  }

  return session;
}
