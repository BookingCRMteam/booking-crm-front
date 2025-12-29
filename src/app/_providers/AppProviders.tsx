'use client';

import type { FC } from 'react';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/uk';

import type { UserWithToken } from '@/features/auth';

import { AccessTokenStoreProvider } from '@/shared/session';
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
  const {
    accessToken = null,
    operator = null,
    user = null,
  } = userWithToken ?? {};
  console.log(accessToken, 'accessToken in AppProviders');
  console.log(operator, 'operator in AppProviders');
  console.log(user, 'user in AppProviders');
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
          <QueryProvider operator={operator} user={user}>
            <AccessTokenStoreProvider accessToken={accessToken}>
              <ApiClientProvider>{children}</ApiClientProvider>
            </AccessTokenStoreProvider>
          </QueryProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};
