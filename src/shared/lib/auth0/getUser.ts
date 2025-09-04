import { cache } from 'react';

import 'server-only';

import { userApi } from '@/shared/api/user';
import { User } from '@/shared/types/user';

import { auth0 } from './auth0';

type UserWithToken = { user: User; accessToken: string };

export const getUser = cache(async (): Promise<UserWithToken | null> => {
  try {
    const session = await auth0.getSession();
    const accessToken = session?.tokenSet.accessToken;
    if (!session || !accessToken) return null;

    const user: User = await userApi.getCurrentUser(accessToken);
    return { user, accessToken };
  } catch (err) {
    console.error('Failed to fetch user data:', err);
    return null;
  }
});
