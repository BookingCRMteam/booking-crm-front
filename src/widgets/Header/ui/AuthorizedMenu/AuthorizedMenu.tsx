'use client';

import { type FC, type ReactNode, useState } from 'react';

import { Box } from '@mui/material';

import { type UserRole } from '@/shared/types';

import { InitialsAvatar } from '../InitialsAvatar/InitialsAvatar';
import { MenuItem } from './MenuItem';
import { MenuItems } from './MenuItems';
import { MenuTooltip } from './MenuTooltip';
import { LOGOUT_LINK, ROLE_MENU_LINKS } from './constants';

type AuthorizedMenuProps = {
  userRole: UserRole;
  firstPersonName: string;
  children?: ReactNode;
};

export const AuthorizedMenu: FC<AuthorizedMenuProps> = ({
  userRole,
  firstPersonName,
  children,
}) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const userInitial = firstPersonName.trim().charAt(0).toUpperCase() || 'U';

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {children}
        <MenuTooltip
          onClick={handleOpenUserMenu}
          title="Відкрити меню користувача"
        >
          <InitialsAvatar initial={userInitial} userRole={userRole} />
        </MenuTooltip>
      </Box>

      <MenuItems anchorElUser={anchorElUser} onClose={handleCloseUserMenu}>
        {ROLE_MENU_LINKS[userRole]?.map((props) => (
          <MenuItem {...props} key={props.href} onClose={handleCloseUserMenu} />
        ))}
        <MenuItem
          {...LOGOUT_LINK}
          onClose={handleCloseUserMenu}
          isDefaultLink
        />
      </MenuItems>
    </>
  );
};
