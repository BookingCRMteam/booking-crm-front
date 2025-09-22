'use client';

import { CoupleProfile } from '@/features/couple-profile';

import { Tabs } from '@/shared/ui';

export const CouplePage = () => {
  const tabs = [
    {
      label: 'Інформація про нас',
      content: <CoupleProfile />,
    },
    { label: 'Наші бронювання', content: <>Наші бронювання</> },
  ];
  return <Tabs tabs={tabs} initialIndex={0} />;
};
