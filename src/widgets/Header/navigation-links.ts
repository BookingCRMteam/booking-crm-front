import { FAQ_SECTION_ID } from '@/pages-layer/home/ui/Faq/constants';
import { STEPS_SECTION_ID } from '@/pages-layer/home/ui/StepsSection/constants';

import { APP_ROUTE } from '@/shared/constants';
import { UserRole } from '@/shared/types';

export const NAVIGATION_LINKS = [
  { name: 'Каталог турів', href: APP_ROUTE.CATALOG },
  { name: 'Як тут все влаштовано', href: `/#${STEPS_SECTION_ID}` },
  { name: 'FAQ для мандрівників', href: `/#${FAQ_SECTION_ID}` },
];

type RouteHref = (typeof APP_ROUTE)[keyof typeof APP_ROUTE];

export const ROLE_MENU_LINKS: Record<
  UserRole,
  { name: string; href: RouteHref }[]
> = {
  traveler: [{ name: 'Profile', href: APP_ROUTE.PROFILE }],
  operator: [{ name: 'Profile', href: APP_ROUTE.OPERATOR }],
};
