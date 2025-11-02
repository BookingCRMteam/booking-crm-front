import Link from 'next/link';

import { Box, Link as MuiLink } from '@mui/material';

import { LINKS, NAVIGATION_LINKS } from '../constants';
import { FooterLink } from './FooterLink';

export const FooterNavigationColumn = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '26px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {NAVIGATION_LINKS.map(({ href, name }) => {
          return (
            <MuiLink
              component={Link}
              key={href}
              variant="navLink"
              underline="none"
              href={href}
              sx={{
                p: '10px 0',
              }}
            >
              {name}
            </MuiLink>
          );
        })}
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: '4px',
        }}
      >
        {LINKS.map(({ href, id, name }) => (
          <FooterLink key={id} href={href} name={name} isSeparator={id !== 1} />
        ))}
      </Box>
    </Box>
  );
};
