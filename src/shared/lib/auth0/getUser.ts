import 'server-only';

import { userApi } from '@/shared/api/user';
import { User } from '@/shared/types/user';

import { auth0 } from './auth0';

type UserWithToken = { user: User; accessToken: string };

export async function getUser(): Promise<UserWithToken | null> {
  const session = await auth0.getSession();
  if (!session) return null;
  console.log(session);
  const accessToken = session.tokenSet.accessToken;
  if (!accessToken) return null;

  try {
    const user: User = await userApi.getCurrentUser(accessToken);
    return { user, accessToken };
  } catch (err) {
    // На публічних маршрутах токен може бути простроченим — не фейлим SSR, просто повертаємо null
    console.error('Failed to fetch user data:', err);
    return null;
  }
}
