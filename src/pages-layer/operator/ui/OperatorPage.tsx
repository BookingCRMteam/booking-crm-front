'use client';

import { OperatorProfile } from '@/features/operator-profile';

import { useOperatorQuery } from '@/entities/operator/model/useOperatorQuery';

import { Tabs } from '@/shared/ui';

import { useOperatorVerificationModal } from '../model/useOperatorVerificationModal';
import { TourFormButtons } from './TourFormButtons';

export const OperatorPage = () => {
  useOperatorVerificationModal();
  const { data: operator } = useOperatorQuery();
  const isVerified = operator?.status === 'approved';
  const tabs = [
    {
      label: 'Мої тури',
      content: (
        <>
          <TourFormButtons />
        </>
      ),
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
