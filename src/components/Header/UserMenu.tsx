import { useUser } from '@auth0/nextjs-auth0';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';

import { useState } from 'react';

import Link from 'next/link';

import { AUTH_URL } from '@/shared/constants/auth';
import { Role } from '@/shared/types/role';

import { ROLE_MENU_LINKS } from './constants';

export const UserMenu = () => {
  const { user, isLoading } = useUser();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const roles: Role[] = user?.roles || [];
  console.log(roles);
  if (!user || isLoading) {
    return (
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="warning"
          component="a"
          href={AUTH_URL.LOGIN}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="success"
          component="a"
          href={`${AUTH_URL.LOGIN}?returnTo=/continue-signup`}
        >
          Login as Operator
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user.nickname} src={user.picture} />
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {ROLE_MENU_LINKS[roles[0]].map(({ href, name }) => (
          <MenuItem key={name} onClick={handleCloseUserMenu}>
            <Typography
              sx={{ textAlign: 'center' }}
              href={href}
              component={Link}
            >
              {name}
            </Typography>
          </MenuItem>
        ))}
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography
            sx={{ textAlign: 'center' }}
            component="a"
            href={AUTH_URL.LOGOUT}
          >
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
