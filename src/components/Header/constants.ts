import { APP_ROUTE } from '@/shared/constants/routes';
import { UserRole } from '@/shared/types/roles';

export const NAVIGATION_LINKS = [
  { name: 'About', href: APP_ROUTE.ABOUT },
  { name: 'Operator', href: APP_ROUTE.OPERATOR },
];

export const USER_MENU_LINKS = [{ name: 'Profile', href: APP_ROUTE.PROFILE }];

export const ROLE_MENU_LINKS: Record<
  UserRole,
  { name: string; href: string }[]
> = {
  traveler: [{ name: 'Profile', href: APP_ROUTE.PROFILE }],
  operator: [
    { name: 'Profile', href: APP_ROUTE.PROFILE },
    { name: 'My tours', href: APP_ROUTE.OPERATOR },
    { name: 'New tour', href: APP_ROUTE.OPERATOR },
  ],
  admin: [
    { name: 'Profile', href: APP_ROUTE.PROFILE },
    { name: 'Moderate tours', href: APP_ROUTE.ADMIN },
    { name: 'Moderate users', href: APP_ROUTE.ADMIN },
    { name: 'Moderate operators', href: APP_ROUTE.ADMIN },
  ],
  superadmin: [
    { name: 'Profile', href: APP_ROUTE.PROFILE },
    { name: 'Moderate roles', href: APP_ROUTE.SUPER_ADMIN },
    { name: 'Moderate tours', href: APP_ROUTE.SUPER_ADMIN },
    { name: 'Moderate users', href: APP_ROUTE.SUPER_ADMIN },
    { name: 'Moderate operators', href: APP_ROUTE.SUPER_ADMIN },
  ],
};
