'use client';

import { useEffect } from 'react';

import { useOperatorQuery } from '@/entities/operator/model/useOperatorQuery';

import { useBookingStore } from '@/shared/store';
import { Tabs } from '@/shared/ui';

import { TourFormButtons } from './TourFormButtons';

export const OperatorPage = () => {
  const { data: operator } = useOperatorQuery();
  const { stopRedirect } = useBookingStore();

  useEffect(() => {
    stopRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabs = [
    {
      label: 'Мої тури',
      content: (
        <>
          <TourFormButtons />
        </>
      ),
      disabled: operator?.status !== 'approved',
    },
    {
      label: 'Бронювання',
      content: <>Бронювання</>,
      disabled: operator?.status !== 'approved',
    },
    { label: 'Мій публічний профіль', content: <>Мій публічний профіль</> },
  ];
  return <Tabs tabs={tabs} initialIndex={2} />;
};
