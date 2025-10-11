'use client';

import { CoupleProfileEditing } from '@/features/couple-profile-editing';

import { Tabs } from '@/shared/ui';

export const CouplePage = () => {
  const tabs = [
    {
      label: 'Інформація про нас',
      content: <CoupleProfileEditing />,
    },
    { label: 'Наші бронювання', content: <>Наші бронювання</> },
  ];
  return <Tabs tabs={tabs} initialIndex={0} />;
};
