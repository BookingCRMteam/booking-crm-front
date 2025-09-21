import { redirect } from 'next/navigation';

import 'server-only';

import { operatorApi } from '@/entities/operator';
import { userApi } from '@/entities/user';

import { AUTH_URL } from '@/shared/constants';
import { auth0 } from '@/shared/lib/auth0';

import { UserWithToken } from '../model/types';

export const getUser = async (): Promise<UserWithToken | null> => {
  try {
    const session = await auth0.getSession();

    const accessToken = session?.tokenSet.accessToken;
    if (!session || !accessToken) return null;
    const user = await userApi.getCurrentUser(accessToken);
    let operator = null;
    if (user && user.role === 'operator') {
      operator = await operatorApi.getOperatorMe(accessToken);
    }
    return { user, accessToken, operator };
  } catch (err) {
    console.error('Failed to fetch user data:', err);
    redirect(AUTH_URL.LOGOUT);
  }
};
