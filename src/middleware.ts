import { type NextRequest, NextResponse } from 'next/server';

import { NEXT_PATHS_ARR } from '@/shared/constants/routes';
import { auth0 } from '@/shared/lib/auth0/auth0';
import { hasAccessToPath, isPublicPath } from '@/shared/utils/access';

import { UserRole } from './shared/types/roles';

export async function middleware(request: NextRequest) {
  const authRes = await auth0.middleware(request);
  const pathname = request.nextUrl.pathname;

  // Пропускаємо публічні маршрути
  if (isPublicPath(pathname)) {
    return authRes;
  }

  const session = await auth0.getSession(request);

  // Перенаправляємо неавторизованих користувачів
  if (!session) {
    const loginUrl = new URL('/auth/login', request.nextUrl.origin);
    loginUrl.searchParams.set('returnTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Перевіряємо права доступу
  const userRoles = (session.user?.roles || []) as UserRole[];

  if (!hasAccessToPath(pathname, userRoles)) {
    return NextResponse.redirect(new URL('/403', request.nextUrl.origin));
  }

  return authRes;
}

export const config = {
  matcher: [`/((?!${NEXT_PATHS_ARR.join('|')}|$).*)`],
};
