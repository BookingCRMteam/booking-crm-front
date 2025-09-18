import { APP_ROUTE } from '@/shared/constants';
import { UserRole } from '@/shared/types';

type RouteHref = (typeof APP_ROUTE)[keyof typeof APP_ROUTE];

export const ROLE_MENU_LINKS: Record<
  UserRole,
  { name: string; href: RouteHref }[]
> = {
  traveler: [{ name: 'Profile', href: APP_ROUTE.PROFILE }],
  operator: [{ name: 'Profile', href: APP_ROUTE.OPERATOR }],
};
