'use client';

import { useOperatorQuery } from '@/entities/operator/model/useOperatorQuery';

import { Tabs } from '@/shared/ui';

import { TourFormButtons } from './TourFormButtons';

export const OperatorPage = () => {
  const { data: operator } = useOperatorQuery();

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
