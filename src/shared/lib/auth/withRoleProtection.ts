import type { SessionData } from '@auth0/nextjs-auth0/types';

import { redirect } from 'next/navigation';

import { APP_ROUTE } from '@/shared/constants/routes';

import { auth0 } from './auth0';

interface RoleOptions {
  requiredRoles: string[];
  redirectPath?: string;
}

export async function withRoleProtection(
  options: RoleOptions = { requiredRoles: [], redirectPath: APP_ROUTE.HOME },
): Promise<SessionData> {
  let session: SessionData | null = null;

  try {
    session = await auth0.getSession();
  } catch (error) {
    console.error('Failed to retrieve session:', error);
    redirect(options.redirectPath || APP_ROUTE.HOME);
  }

  if (!session || !session.user) {
    redirect(options.redirectPath || APP_ROUTE.HOME);
  }

  const userRoles = session.user.roles as string[] | undefined;

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
