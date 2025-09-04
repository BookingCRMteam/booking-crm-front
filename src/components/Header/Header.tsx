'use client';

import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';

import { useState } from 'react';

import Link from 'next/link';

import ModeSwitch from '@/components/ModeSwitch/ModeSwitch';

import { UserMenu } from './UserMenu';
import { NAVIGATION_LINKS } from './constants';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuToggle}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Paired Paths
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {NAVIGATION_LINKS.map(
              ({ href, name }: { href: string; name: string }) => (
                <Typography
                  key={name}
                  component={Link}
                  href={href}
                  sx={{ my: 2, mx: 2, color: 'inherit', display: 'block' }}
                >
                  {name}
                </Typography>
              ),
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <ModeSwitch />
            <UserMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
