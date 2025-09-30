'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Box, Link as MuiLink } from '@mui/material';

import { NAVIGATION_LINKS } from '../navigation-links';

export const NavigationLinks = () => {
  const pathName = usePathname();
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 5 }}>
      {NAVIGATION_LINKS.map(({ href, name }) => {
        const isActive = pathName === href;
        return (
          <MuiLink
            component={Link}
            key={href}
            variant={isActive ? 'navLinkActive' : 'navLink'}
            underline="none"
            href={href}
          >
            {name}
          </MuiLink>
        );
      })}
    </Box>
  );
};
