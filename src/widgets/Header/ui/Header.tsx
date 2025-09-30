'use client';

import Image from 'next/image';
import Link from 'next/link';

import { AppBar, Container, Link as MuiLink } from '@mui/material';

import { useOperatorQuery } from '@/entities/operator';
import { useUserQuery } from '@/entities/user';

import { APP_ROUTE } from '@/shared/constants';
import { customPalette } from '@/shared/theme/customColors';

import { NavigationLinks } from './NavigationLinks';
import { UserMenu } from './UserMenu';

export const Header = () => {
  const { data: user } = useUserQuery();
  const { data: operator } = useOperatorQuery();
  return (
    <AppBar
      position="static"
      component="header"
      sx={{ background: customPalette.primary.light2, boxShadow: 'none' }}
    >
      <Container
        maxWidth={'lg'}
        sx={{
          padding: '8px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <MuiLink
          component={Link}
          href={APP_ROUTE.HOME}
          sx={{
            p: 0,
            fontSize: 0,
            lineHeight: 0,
          }}
        >
          <Image src="/images/logo.png" width={127} height={44} alt="logo" />
        </MuiLink>
        <NavigationLinks />
        <UserMenu user={user ?? null} operatorStatus={operator?.status} />
      </Container>
    </AppBar>
  );
};
