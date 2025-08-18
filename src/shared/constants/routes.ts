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
  CATALOG = '/catalog',
  OPERATOR_ONBOARDING = '/operator-onboarding',
}

export const PUBLIC_PATHS = {
  HOME: APP_ROUTE.HOME,
  CATALOG: APP_ROUTE.CATALOG,
  ABOUT: APP_ROUTE.ABOUT,
  TOURS: APP_ROUTE.TOURS,
  CONTACT: APP_ROUTE.CONTACT,
} as const;

// Масив всіх публічних шляхів
export const PUBLIC_PATHS_ARR = Object.values(PUBLIC_PATHS);
