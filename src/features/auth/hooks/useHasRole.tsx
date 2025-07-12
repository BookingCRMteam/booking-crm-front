'use client';

import { useUser } from '@auth0/nextjs-auth0';

export function useHasRole(requiredRole: string): boolean {
  const { user, isLoading } = useUser();

  if (isLoading || !user) {
    return false;
  }

  const userRoles = user.roles;

  if (!Array.isArray(userRoles)) {
    return false;
  }

  return userRoles.some(
    (role) =>
      typeof role === 'string' &&
      role.toLowerCase() === requiredRole.toLowerCase(),
  );
}
