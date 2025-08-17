import { type NextRequest, NextResponse } from 'next/server';

import { auth0 } from '@/shared/lib/auth0/auth0';
import { isPublicPath } from '@/shared/utils/access';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/auth')) {
    return auth0.middleware(request);
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const authRes = await auth0.middleware(request);

  const session = await auth0.getSession(request);
  if (!session) {
    const loginUrl = new URL('/auth/login', request.nextUrl.origin);
    loginUrl.searchParams.set('returnTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    await auth0.getAccessToken(request, authRes);
  } catch {
    const loginUrl = new URL('/auth/login', request.nextUrl.origin);
    loginUrl.searchParams.set('returnTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

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
