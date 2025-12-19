import type { FC } from 'react';

import { AppBar, Container, Toolbar } from '@mui/material';

import { AppLogo } from '@/shared/ui';
import { OperatorStatusBadge } from '@/shared/ui';

import { AuthorizedMenu } from '../AuthorizedMenu/AuthorizedMenu';
import { NavigationLinks } from '../NavigationLinks/NavigationLinks';
import { ReplayLabel } from '../ReplayLabel/ReplayLabel';
import { UnauthorizedMenu } from '../UnauthorizedMenu/UnauthorizedMenu';
import type { HeaderPureProps } from './types';

const HeaderPure: FC<HeaderPureProps> = ({
  operatorStatus,
  userRole,
  firstPersonName,
  isPendingPayment = false,
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
          <AppLogo />
          <NavigationLinks isOperator={isOperator} />
          {isAuthorized ? (
            <AuthorizedMenu
              userRole={userRole}
              firstPersonName={firstPersonName}
            >
              {isOperator && operatorStatus && (
                <OperatorStatusBadge status={operatorStatus} />
              )}
              {isPendingPayment && <ReplayLabel />}
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
