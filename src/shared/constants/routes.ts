export enum APP_ROUTE {
  HOME = '/',
  USER = '/user',
  ADMIN = '/admin',
  SUPER_ADMIN = '/super-admin',
  OPERATOR = '/operator',
  PROFILE = '/profile',
  TOURS = '/tours',
  COUNTRIES = '/countries',
  ABOUT = '/about',
  CONTACT = '/contact',
  BOOKING = '/booking',
  BOOKINGS = '/bookings',
  CATALOG = '/catalog',
  FAQ = '/faq',
  AUTH_REDIRECT = '/auth-redirect/',
  AUTH_REDIRECT_OPERATOR = '/auth-redirect/?authFlow=onboarding',
  OPERATOR_ONBOARDING = '/operator-onboarding',
  OPERATOR_PROFILE = '/operator/profile',
  UI_KIT = '/ui-kit',
}

export const DYNAMIC_ROUTE = {
  CITIES: (iso2: string) => `/countries/${iso2}/cities`,
  TOUR: (tourId: number) => `/tours/${tourId}`,
};

export const PUBLIC_PATHS = {
  HOME: APP_ROUTE.HOME,
  CATALOG: APP_ROUTE.CATALOG,
  ABOUT: APP_ROUTE.ABOUT,
  TOURS: APP_ROUTE.TOURS,
  CONTACT: APP_ROUTE.CONTACT,
  FAQ: APP_ROUTE.FAQ,
  UI_KIT: APP_ROUTE.UI_KIT,
} as const;
