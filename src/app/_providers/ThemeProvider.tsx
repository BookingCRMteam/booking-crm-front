'use client';

import type { FC } from 'react';

import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';

import { theme } from '@/shared/theme';
import type { ProviderProps } from '@/shared/types';

export const ThemeProvider: FC<ProviderProps> = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
