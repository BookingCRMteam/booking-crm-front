'use client';

import { useEffect } from 'react';

import { ErrorPage } from '@/pages-layer/error';

import { AppProviders } from './_providers';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="uk">
      <body>
        <AppProviders userWithToken={null}>
          <ErrorPage onReset={reset} />
        </AppProviders>
      </body>
    </html>
  );
}
