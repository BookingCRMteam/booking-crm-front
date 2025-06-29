'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, useState } from 'react';

interface TanstackProviderProps {
  children: React.ReactNode;
}

export const TanstackProvider: FC<TanstackProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
