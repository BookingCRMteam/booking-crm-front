'use client';

import { useUserBookingsQuery } from '@/entities/booking';
import { useOperatorQuery } from '@/entities/operator';
import { useUserQuery } from '@/entities/user';

import HeaderPure from './HeaderPure/HeaderPure';

export const Header = () => {
  const { data: user } = useUserQuery();
  const { data: operator } = useOperatorQuery();
  const { data: bookings } = useUserBookingsQuery({
    status: 'pending_payment',
  });

  const isPendingPayment = !!bookings?.length;
  const firstPersonName = operator?.firstName || user?.firstPersonName;
  return (
    <HeaderPure
      operatorStatus={operator?.status}
      userRole={user?.role}
      firstPersonName={firstPersonName}
      isPendingPayment={isPendingPayment}
    />
  );
};
