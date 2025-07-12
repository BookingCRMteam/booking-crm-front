'use client';

import { useUser } from '@auth0/nextjs-auth0';

export function useHasRole(requiredRole: string): boolean {
  const { user, isLoading } = useUser();

  if (isLoading || !user) {
    return false;
  }

  const userRoles = user.roles as string[] | undefined;

  return (
    userRoles?.some(
      (role) => role.toLowerCase() === requiredRole.toLowerCase(),
    ) || false
  );
}
