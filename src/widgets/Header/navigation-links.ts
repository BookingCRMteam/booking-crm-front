import { APP_ROUTE } from '@/shared/constants';
import { UserRole } from '@/shared/types';

export const NAVIGATION_LINKS = [
  { id: 1, name: 'Каталог турів', href: APP_ROUTE.CATALOG },
  { id: 2, name: 'Як тут все влаштовано', href: APP_ROUTE.ABOUT },
  { id: 3, name: 'FAQ для мандрівників', href: APP_ROUTE.FAQ },
] as const;

export const NAVIGATION_OPERATORS_LINKS = [
  { id: 1, name: 'Каталог турів', href: APP_ROUTE.CATALOG },
  { id: 2, name: 'Мої тури', href: APP_ROUTE.OPERATOR_TOURS },
  { id: 3, name: 'Бронювання', href: APP_ROUTE.OPERATOR_BOOKINGS },
  { id: 4, name: 'Мій профіль', href: APP_ROUTE.OPERATOR },
] as const;

type RouteHref = (typeof APP_ROUTE)[keyof typeof APP_ROUTE];

export const ROLE_MENU_LINKS: Record<
  UserRole,
  { name: string; href: RouteHref }[]
> = {
  traveler: [{ name: 'Наш профіль', href: APP_ROUTE.PROFILE }],
  operator: [{ name: 'Профіль', href: APP_ROUTE.OPERATOR }],
};
