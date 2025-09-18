'use client';

import type { FC } from 'react';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import { UserStoreProvider } from '@/entities/user';

import type { UserWithToken } from '@/shared/lib/auth0';
import type { ProviderProps } from '@/shared/types';

import { ApiClientProvider } from './ApiClientProvider';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';

interface AppProviderProps extends ProviderProps {
  userWithToken: UserWithToken | null;
}

export const AppProviders: FC<AppProviderProps> = ({
  children,
  userWithToken,
}) => {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider>
        <QueryProvider>
          <UserStoreProvider userWithToken={userWithToken}>
            <ApiClientProvider>{children}</ApiClientProvider>
          </UserStoreProvider>
        </QueryProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};
