'use client';

import { useEffect } from 'react';

import { ErrorPage } from '@/pages-layer/error';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorPage onReset={reset} />;
}
