import type { FC } from 'react';

import type { OperatorStatus } from '@/entities/operator';
import type { User } from '@/entities/user';

import { AuthorizedMenu } from './AuthorizedMenu';
import { UnauthorizedMenu } from './UnauthorizedMenu';

interface UserMenuProps {
  user: User | null;
  operatorStatus?: OperatorStatus;
}

export const UserMenu: FC<UserMenuProps> = ({ user, operatorStatus }) => {
  return user ? (
    <AuthorizedMenu user={user} operatorStatus={operatorStatus} />
  ) : (
    <UnauthorizedMenu />
  );
};
