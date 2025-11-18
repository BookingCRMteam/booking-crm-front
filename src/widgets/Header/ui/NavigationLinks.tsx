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
  const currentPath = pathName ?? '';
  return (
    <NavigationLinksWrapper isOperator={isOperator}>
      {links.map(({ href, name, id }) => {
        const cleanPath = currentPath.split('?')[0];
        const isExactMatch = currentPath === href;
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
