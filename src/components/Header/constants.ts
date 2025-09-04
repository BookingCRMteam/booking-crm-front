import { APP_ROUTE } from '@/shared/constants/routes';
import { UserRole } from '@/shared/types/roles';

export const NAVIGATION_LINKS = [
  { name: 'Каталог турів', href: APP_ROUTE.CATALOG },
  { name: 'Як тут все влаштовано', href: APP_ROUTE.ABOUT },
  { name: 'FAQ для мандрівників', href: APP_ROUTE.FAQ },
];

export const ROLE_MENU_LINKS: Record<
  UserRole,
  { name: string; href: APP_ROUTE }[]
> = {
  traveler: [{ name: 'Profile', href: APP_ROUTE.PROFILE }],
  operator: [{ name: 'Profile', href: APP_ROUTE.OPERATOR }],
};
