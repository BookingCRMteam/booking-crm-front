'use client';

import { FC, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { OperatorMe } from '@/entities/operator';
import { User } from '@/entities/user';

import { ProviderProps } from '@/shared/types';

interface QueryProviderProps extends ProviderProps {
  user: User | null;
  operator: OperatorMe | null;
}

export const QueryProvider: FC<QueryProviderProps> = ({
  children,
  operator,
  user,
}) => {
  const [queryClient] = useState(() => {
    const qc = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 0,
        },
      },
    });

    qc.setQueryData(['user', 'me'], user ?? null);
    qc.setQueryData(['operator', 'me'], operator ?? null);

    return qc;
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
