import { Auth0Provider } from '@auth0/nextjs-auth0';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { ThemeProvider } from '@mui/material/styles';

import { Metadata } from 'next';

import Header from '@/components/Header/Header';
import { Notification } from '@/components/Notification/Notification';

import { TanstackProvider } from '@/shared/providers/TanstackProvider';
import { theme } from '@/shared/theme/theme';

import { roboto } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Booking CRM',
  description: 'Booking CRM',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Auth0Provider>
              <TanstackProvider>
                <Header />
                {children}
                <Notification />
              </TanstackProvider>
            </Auth0Provider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
