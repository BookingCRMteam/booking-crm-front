import { type NextRequest, NextResponse } from 'next/server';

import { auth0 } from '@/shared/lib/auth0/auth0';
import { isPublicPath } from '@/shared/utils/access';

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const authRes = await auth0.middleware(request);

  if (pathname.startsWith('/auth') || isPublicPath(pathname)) {
    return authRes;
  }

  try {
    const session = await auth0.getSession(request);

    if (!session?.tokenSet.accessToken) {
      return redirectToLogin(origin, pathname);
    }

    await auth0.getAccessToken(request, authRes);

    return authRes;
  } catch (err) {
    console.error('Auth middleware error:', err);
    return redirectToLogin(origin, pathname);
  }
}

function redirectToLogin(origin: string, pathname: string) {
  const loginUrl = new URL('/auth/login', origin);
  loginUrl.searchParams.set('returnTo', pathname);
  return NextResponse.redirect(loginUrl);
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
