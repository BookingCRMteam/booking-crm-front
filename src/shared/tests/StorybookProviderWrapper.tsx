import type { FC, ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AccessTokenStoreProvider } from '../session';

interface StorybookProviderWrapperProps {
  children: ReactNode;
  token: string | null;
  setQueryMocks?: (client: QueryClient) => void;
}

let storybookQueryClient: QueryClient | null = null;
const getStorybookQueryClient = () => {
  if (!storybookQueryClient) {
    storybookQueryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false, staleTime: Infinity },
      },
    });
  }
  return storybookQueryClient;
};
export const StorybookProviderWrapper: FC<StorybookProviderWrapperProps> = ({
  children,
  token,
  setQueryMocks,
}) => {
  const storybookQueryClient = getStorybookQueryClient();

  if (setQueryMocks) {
    setQueryMocks(storybookQueryClient);
  }

  return (
    <AccessTokenStoreProvider accessToken={token}>
      <QueryClientProvider client={storybookQueryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AccessTokenStoreProvider>
  );
};
