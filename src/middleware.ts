import { type NextRequest, NextResponse } from 'next/server';

import { auth0 } from '@/shared/lib/auth/auth0';

export async function middleware(request: NextRequest) {
  const authRes = await auth0.middleware(request);

  const pathname = request.nextUrl.pathname;

  // 🟢 Публічні маршрути — пропускаємо всіх
  const publicPaths = ['/', '/about', '/search', '/tours', '/contact'];
  const isPublic = publicPaths.some((path) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path),
  );

  if (isPublic || pathname.startsWith('/auth')) {
    console.log('public');
    return authRes;
  }

  const session = await auth0.getSession(request);

  if (!session) {
    console.log('not logged in');
    // ❌ Користувач не залогінений і не на публічній сторінці — редирект на логін
    const loginUrl = new URL('/auth/login', request.nextUrl.origin);
    loginUrl.searchParams.set('returnTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const userRoles: string[] = session.user?.roles || [];

  // 🛡️ Матриця доступу по ролях
  const accessMatrix: Record<string, string[]> = {
    '/profile': ['Tourist', 'SuperAdmin', 'Admin', 'Operator'],
    '/booking': ['Tourist', 'SuperAdmin'],
    '/tourist': ['Tourist', 'SuperAdmin'],
    '/operator': ['Operator', 'SuperAdmin'],
    '/admin': ['Admin', 'SuperAdmin'],
    '/super-admin': ['SuperAdmin'],
  };

  for (const [routePrefix, allowedRoles] of Object.entries(accessMatrix)) {
    if (pathname.startsWith(routePrefix)) {
      const hasAccess = allowedRoles.some((role) => userRoles.includes(role));
      if (!hasAccess) {
        console.log('no access');
        return NextResponse.redirect(new URL('/403', request.nextUrl.origin));
      }
    }
  }
  console.log('access');
  return authRes;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|$).*)',
  ],
};
