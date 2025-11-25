'use client';

import { useEffect } from 'react';

import { ErrorPage } from '@/pages-layer/error';

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
        <ErrorPage onReset={reset} />
      </body>
    </html>
  );
}
