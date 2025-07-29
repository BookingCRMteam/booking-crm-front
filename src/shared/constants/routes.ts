export enum APP_ROUTE {
  HOME = '/',
  USER = '/user',
  ADMIN = '/admin',
  SUPER_ADMIN = '/super-admin',
  OPERATOR = '/operator',
  PROFILE = '/profile',
  TOURS = '/tours',
  ABOUT = '/about',
  CONTACT = '/contact',
  BOOKING = '/booking',
  BOOKINGS = '/bookings',
}

export const PUBLIC_PATHS = {
  HOME: '/',
  ABOUT: '/about',
  SEARCH: '/search',
  TOURS: '/tours',
  CONTACT: '/contact',
  AUTH: '/auth',
} as const;

// Масив всіх публічних шляхів
export const PUBLIC_PATHS_ARR = Object.values(PUBLIC_PATHS);

// Службові шляхи Next.js
export const NEXT_PATHS = {
  STATIC: '_next/static',
  IMAGE: '_next/image',
  FAVICON: 'favicon.ico',
  SITEMAP: 'sitemap.xml',
  ROBOTS: 'robots.txt',
} as const;

// Масив службових шляхів
export const NEXT_PATHS_ARR = Object.values(NEXT_PATHS);
