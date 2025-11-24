'use client';

import { useEffect } from 'react';

import { OperatorProfile } from '@/features/operator-profile';

import { useOperatorQuery } from '@/entities/operator/model/useOperatorQuery';

import { useBookingStore } from '@/shared/store';
import { Tabs } from '@/shared/ui';

import { useOperatorVerificationModal } from '../model/useOperatorVerificationModal';

export const OperatorPage = () => {
  useOperatorVerificationModal();
  const { data: operator } = useOperatorQuery();

  const isVerified = operator?.status === 'approved';

  const { stopRedirect } = useBookingStore();

  useEffect(() => {
    stopRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabs = [
    {
      label: 'Мої тури',
      content: <>Мої тури</>,
      disabled: !isVerified,
    },
    {
      label: 'Бронювання',
      content: <>Бронювання</>,
      disabled: !isVerified,
    },
    { label: 'Мій публічний профіль', content: <OperatorProfile /> },
  ];
  return <Tabs tabs={tabs} initialIndex={2} />;
};
