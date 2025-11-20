import type { ReactNode } from 'react';

import { authGuard } from '@/features/auth';

import { APP_ROUTE } from '@/shared/constants';

export default async function OperatorLayout({
  children,
}: {
  children: ReactNode;
}) {
  await authGuard(APP_ROUTE.OPERATOR, ['operator']);
  return children;
}
