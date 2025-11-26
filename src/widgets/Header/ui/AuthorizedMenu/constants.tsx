import { ReactNode } from 'react';

import { SignOutIcon, UsersIcon } from '@phosphor-icons/react';

import { APP_ROUTE, AUTH_URL } from '@/shared/constants';
import { theme } from '@/shared/theme';
import { UserRole } from '@/shared/types';

export type RouteHref = (typeof APP_ROUTE)[keyof typeof APP_ROUTE];

export const ROLE_MENU_LINKS: Record<
  UserRole,
  { name: string; href: RouteHref; icon: ReactNode }[]
> = {
  traveler: [
    {
      name: 'Особистий кабінет',
      href: APP_ROUTE.PROFILE,
      icon: <UsersIcon size={20} color={theme.palette.primary.main} />,
    },
  ],
  operator: [],
};

export const LOGOUT_LINK: { name: string; href: string; icon: ReactNode } = {
  name: 'Вийти з акаунту',
  href: AUTH_URL.LOGOUT,
  icon: <SignOutIcon size={20} color={theme.palette.error.main} />,
};
