import type { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { AppBar, Container, Link as MuiLink, Toolbar } from '@mui/material';

import type { OperatorStatus } from '@/entities/operator';

import { APP_ROUTE } from '@/shared/constants';
import { UserRole } from '@/shared/types';

import { AuthorizedMenu } from './AuthorizedMenu';
import { NavigationLinks } from './NavigationLinks';
import { OperatorStatusHeader } from './OperatorStatusHeader';
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
  const isOperator = userRole === 'operator';
  const isAuthorized = userRole !== undefined && firstPersonName !== undefined;
  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: 'secondary.main', boxShadow: 'none' }}
    >
      <Toolbar variant="dense">
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
          <NavigationLinks isOperator={isOperator} />
          {isAuthorized ? (
            <AuthorizedMenu
              userRole={userRole}
              firstPersonName={firstPersonName}
            >
              {isOperator && operatorStatus && (
                <OperatorStatusHeader status={operatorStatus} />
              )}
            </AuthorizedMenu>
          ) : (
            <UnauthorizedMenu />
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderPure;
