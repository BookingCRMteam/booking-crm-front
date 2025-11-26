import type { FC } from 'react';

import { AppBar, Container, Toolbar } from '@mui/material';

import type { OperatorStatus } from '@/entities/operator';

import { UserRole } from '@/shared/types';
import { AppLogo } from '@/shared/ui';

import { AuthorizedMenu } from '../AuthorizedMenu/AuthorizedMenu';
import { NavigationLinks } from '../NavigationLinks/NavigationLinks';
import { OperatorStatusHeader } from '../OperatorStatusHeader/OperatorStatusHeader';
import { UnauthorizedMenu } from '../UnauthorizedMenu/UnauthorizedMenu';

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
          <AppLogo />
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
