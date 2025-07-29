import { APP_ROUTE } from '@/shared/constants/routes';
import { Role } from '@/shared/types/role';

export const NAVIGATION_LINKS = [
  { name: 'Tours', href: APP_ROUTE.TOURS },
  { name: 'About', href: APP_ROUTE.ABOUT },
  { name: 'Contact', href: APP_ROUTE.CONTACT },
];

export const USER_MENU_LINKS = [{ name: 'Profile', href: APP_ROUTE.PROFILE }];

export const ROLE_MENU_LINKS: Record<Role, { name: string; href: string }[]> = {
  Tourist: [
    { name: 'Profile', href: APP_ROUTE.PROFILE },
    { name: 'My bookings', href: APP_ROUTE.BOOKINGS },
  ],
  Operator: [
    { name: 'Profile', href: APP_ROUTE.PROFILE },
    { name: 'My tours', href: APP_ROUTE.OPERATOR },
    { name: 'New tour', href: APP_ROUTE.OPERATOR },
  ],
  Admin: [
    { name: 'Profile', href: APP_ROUTE.PROFILE },
    { name: 'Moderate tours', href: APP_ROUTE.ADMIN },
    { name: 'Moderate users', href: APP_ROUTE.ADMIN },
    { name: 'Moderate operators', href: APP_ROUTE.ADMIN },
  ],
  SuperAdmin: [
    { name: 'Profile', href: APP_ROUTE.PROFILE },
    { name: 'Moderate roles', href: APP_ROUTE.SUPER_ADMIN },
    { name: 'Moderate tours', href: APP_ROUTE.SUPER_ADMIN },
    { name: 'Moderate users', href: APP_ROUTE.SUPER_ADMIN },
    { name: 'Moderate operators', href: APP_ROUTE.SUPER_ADMIN },
  ],
};
