'use client';

import { Tabs } from '@/shared/ui';

export const ProfilePage = () => {
  const tabs = [
    {
      label: 'Інформація про нас',
      content: <>Наша інформація, форма редагування нашої інформацї</>,
    },
    { label: 'Наші бронювання', content: <>Наші бронювання</> },
  ];
  return <Tabs tabs={tabs} initialIndex={0} />;
};
