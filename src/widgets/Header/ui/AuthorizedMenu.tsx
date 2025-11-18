'use client';

import { type FC, ReactNode, useState } from 'react';

import Link from 'next/link';

import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';

import { AUTH_URL } from '@/shared/constants';
import { UserRole } from '@/shared/types';

import { ROLE_MENU_LINKS } from '../navigation-links';
import { InitialsAvatar } from './InitialsAvatar';

interface AuthorizedMenuProps {
  userRole: UserRole;
  firstPersonName: string;
  children?: ReactNode;
}

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
        <Tooltip title="Відкрити меню користувача">
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{ p: 0 }}
            aria-label="user-menu"
          >
            <InitialsAvatar initial={userInitial} role={userRole} />
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        disableScrollLock
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {ROLE_MENU_LINKS[userRole]?.map(({ href, name }) => (
          <MenuItem key={name} onClick={handleCloseUserMenu}>
            <Link
              href={href}
              passHref
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Typography sx={{ textAlign: 'center' }} component="p">
                {name}
              </Typography>
            </Link>
          </MenuItem>
        ))}
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography
            component="a"
            href={AUTH_URL.LOGOUT}
            sx={{
              textAlign: 'center',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            Вихід
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
