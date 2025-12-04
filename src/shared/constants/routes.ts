export enum APP_ROUTE {
  HOME = '/',
  USER = '/user',
  ADMIN = '/admin',
  SUPER_ADMIN = '/super-admin',
  OPERATOR = '/operator',
  OPERATOR_TOURS = '/operator-tours',
  OPERATOR_TOURS_CREATE = '/operator-tours/create',
  OPERATOR_BOOKINGS = '/operator-bookings',
  PROFILE = '/profile',
  TOURS = '/tours',
  COUNTRIES = '/countries',
  ABOUT = `/#step_section_id`,
  CONTACT = '/contact',
  BOOKINGS = '/bookings',
  CATALOG = '/catalog',
  FAQ = '/#faq_section_id',
  AUTH_REDIRECT = '/auth-redirect/',
  AUTH_REDIRECT_OPERATOR = '/auth-redirect/?authFlow=onboarding',
  OPERATOR_ONBOARDING = '/operator-onboarding',
  UI_KIT = '/ui-kit',
  TOUR = '/tour',
}

export const DYNAMIC_ROUTE = {
  CITIES: (iso2: string) => `/countries/${iso2}/cities`,
  TOUR: (tourId: number) => `/tours/${tourId}`,
  TOUR_PHOTO: (tourId: number, photoId: number) =>
    `/tours/${tourId}/photos/${photoId}`,
  OPERATOR_TOURS_EDIT: (tourId: number) => `/operator-tours/edit/${tourId}`,
  OPERATOR_PUBLIC: (operatorId: number) => `/catalog/operator/${operatorId}`,
  BOOKING_BY_ID: (tourId: number, bookingId: number) =>
    `/bookings/${tourId}/${bookingId}`,
};

export const PUBLIC_PATHS = {
  HOME: APP_ROUTE.HOME,
  CATALOG: APP_ROUTE.CATALOG,
  ABOUT: APP_ROUTE.ABOUT,
  TOURS: APP_ROUTE.TOURS,
  CONTACT: APP_ROUTE.CONTACT,
  FAQ: APP_ROUTE.FAQ,
  UI_KIT: APP_ROUTE.UI_KIT,
  TOUR: APP_ROUTE.TOUR,
} as const;
