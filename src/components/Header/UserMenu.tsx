'use client';

import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import {
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
import { APP_ROUTE } from '@/shared/constants/routes';
import { useUserStore } from '@/shared/providers/UserStoreProvider';

import { ROLE_MENU_LINKS } from './constants';

export const UserMenu = () => {
  const { user } = useUserStore((state) => state);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (!user) {
    return (
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          color="inherit"
          component="a"
          startIcon={<PeopleAltOutlinedIcon />}
          href={`${AUTH_URL.LOGIN}?returnTo=${APP_ROUTE.AUTH_REDIRECT}`}
        >
          Вхід
        </Button>
      </Box>
    );
  }
  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {user.firstPersonName?.charAt(0)?.toUpperCase() || 'U'}
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        disableScrollLock
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
        {ROLE_MENU_LINKS[user.role]?.map(({ href, name }) => (
          <MenuItem key={name} onClick={handleCloseUserMenu}>
            <Link href={href}>
              <Typography sx={{ textAlign: 'center' }} component="p">
                {name}
              </Typography>
            </Link>
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
