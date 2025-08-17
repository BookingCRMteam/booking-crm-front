'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { type ReactNode } from 'react';

import { Notification } from '@/components/Notification/Notification';

import { TanstackProvider } from '@/shared/providers/TanstackProvider';
import { UserStoreProvider } from '@/shared/providers/UserStoreProvider';
import theme from '@/shared/theme/theme';
import { User } from '@/shared/types/user';

import ApiClientProvider from './ApiClientProvider';

export default function AppProviders({
  children,
  user,
  accessToken,
}: {
  children: ReactNode;
  user: User | null;
  accessToken: string | null;
}) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TanstackProvider>
          <UserStoreProvider user={user} accessToken={accessToken}>
            <ApiClientProvider>{children}</ApiClientProvider>
            <Notification />
          </UserStoreProvider>
        </TanstackProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
