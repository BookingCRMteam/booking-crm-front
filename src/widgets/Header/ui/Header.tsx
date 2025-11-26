'use client';

import { useOperatorQuery } from '@/entities/operator';
import { useUserQuery } from '@/entities/user';

import HeaderPure from './HeaderPure/HeaderPure';

export const Header = () => {
  const { data: user } = useUserQuery();
  const { data: operator } = useOperatorQuery();
  const firstPersonName = operator?.firstName || user?.firstPersonName;
  return (
    <HeaderPure
      operatorStatus={operator?.status}
      userRole={user?.role}
      firstPersonName={firstPersonName}
    />
  );
};
