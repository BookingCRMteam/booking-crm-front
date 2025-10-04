'use client';

import { useOperatorQuery } from '@/entities/operator';
import { useUserQuery } from '@/entities/user';

import HeaderPure from './HeaderPure';

export const Header = () => {
  const { data: user } = useUserQuery();
  const { data: operator } = useOperatorQuery();
  return (
    <HeaderPure
      operatorStatus={operator?.status}
      userRole={user?.role}
      firstPersonName={user?.firstPersonName || undefined}
    />
  );
};
