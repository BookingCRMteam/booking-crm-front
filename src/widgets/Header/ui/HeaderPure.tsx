import type { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { AppBar, Container, Link as MuiLink } from '@mui/material';

import type { OperatorStatus } from '@/entities/operator';

import { APP_ROUTE } from '@/shared/constants';
import { UserRole } from '@/shared/types';

import { AuthorizedMenu } from './AuthorizedMenu';
import { NavigationLinks } from './NavigationLinks';
import { OperatorStatusDisplay } from './OperatorStatusDisplay';
import { UnauthorizedMenu } from './UnauthorizedMenu';

interface HeaderPureProps {
  userRole?: UserRole;
  firstPersonName?: string;
  operatorStatus?: OperatorStatus;
}

const HeaderPure: FC<HeaderPureProps> = ({
  operatorStatus,
  userRole,
  firstPersonName,
}) => {
  return (
    <AppBar
      position="static"
      component="header"
      sx={{ bgcolor: 'secondary.main', boxShadow: 'none' }}
    >
      <Container
        maxWidth="lg"
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
          <Image
            src="/images/logo.png"
            width={127}
            height={44}
            alt="Booking CRM logo"
            priority
          />
        </MuiLink>
        <NavigationLinks />
        {userRole !== undefined && firstPersonName !== undefined ? (
          <AuthorizedMenu userRole={userRole} firstPersonName={firstPersonName}>
            {operatorStatus && (
              <OperatorStatusDisplay status={operatorStatus} />
            )}
          </AuthorizedMenu>
        ) : (
          <UnauthorizedMenu />
        )}
      </Container>
    </AppBar>
  );
};

export default HeaderPure;
