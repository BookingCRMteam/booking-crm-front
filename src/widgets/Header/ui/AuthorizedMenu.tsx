'use client';

import { type FC, useState } from 'react';

import Link from 'next/link';

import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';

import { OperatorStatus } from '@/entities/operator';
import { User } from '@/entities/user';

import { AUTH_URL } from '@/shared/constants';

import { ROLE_MENU_LINKS } from '../navigation-links';
import { OperatorStatusDisplay } from './OperatorStatusDisplay';

interface AuthorizedMenuProps {
  user: User;
  operatorStatus?: OperatorStatus;
}

export const AuthorizedMenu: FC<AuthorizedMenuProps> = ({
  user,
  operatorStatus,
}) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const userInitial = user.firstPersonName?.charAt(0)?.toUpperCase() || 'U';

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {operatorStatus && <OperatorStatusDisplay status={operatorStatus} />}
        <Tooltip title="Відкрити меню користувача">
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{ p: 0 }}
            aria-label="user-menu"
          >
            <Typography
              component="span"
              sx={{
                width: 35,
                height: 35,
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '18px',
              }}
            >
              {userInitial}
            </Typography>
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
        {ROLE_MENU_LINKS[user.role]?.map(({ href, name }) => (
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
            Вийти
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
