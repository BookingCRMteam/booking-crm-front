'use client';

import type { FC } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Box, type BoxProps, Link as MuiLink, styled } from '@mui/material';

import {
  NAVIGATION_LINKS,
  NAVIGATION_OPERATORS_LINKS,
} from '../navigation-links';

type NavigationLinksProps = {
  isOperator?: boolean;
};

type NavigationLinksWrapperProps = BoxProps & {
  isOperator: boolean;
};

const NavigationLinksWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOperator',
})<NavigationLinksWrapperProps>(({ isOperator, theme }) => ({
  gap: isOperator ? '55px' : '40px',
  display: 'none',

  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

export const NavigationLinks: FC<NavigationLinksProps> = ({
  isOperator = false,
}) => {
  const pathName = usePathname();
  const links = isOperator ? NAVIGATION_OPERATORS_LINKS : NAVIGATION_LINKS;
  return (
    <NavigationLinksWrapper isOperator={isOperator}>
      {links.map(({ href, name, id }) => {
        // 1. Очищуємо поточний шлях від параметрів запиту
        const cleanPath = pathName.split('?')[0];

        // 2. Визначаємо активність

        // Активність визначається, якщо:
        // a) Поточний шлях ТОЧНО збігається з посиланням (наприклад, '/catalog' === '/catalog')
        // АБО
        // b) Поточний шлях починається з посилання + СЛЕШ (наприклад, '/catalog/tour'.startsWith('/catalog/'))

        const isExactMatch = cleanPath === href;
        const isSubRouteMatch = cleanPath.startsWith(`${href}/`);

        const isActive = isExactMatch || isSubRouteMatch;

        return (
          <MuiLink
            component={Link}
            key={id}
            variant={isActive ? 'navLinkActive' : 'navLink'}
            underline="none"
            href={href}
          >
            {name}
          </MuiLink>
        );
      })}
    </NavigationLinksWrapper>
  );
};
