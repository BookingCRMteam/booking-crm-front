import { useEffect } from 'react';

import { Meta, StoryObj } from '@storybook/nextjs';

import { useBookingStore } from '@/shared/store';

import { PageOverlay } from './PageOverlay';

const meta: Meta<typeof PageOverlay> = {
  title: 'UI/PageOverlay',
  component: PageOverlay,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component:
          'Оверлей, який блокує сторінку під час редіректу або завантаження.',
      },
    },
  },
};

export default meta;

export const Default: StoryObj<typeof PageOverlay> = {
  render: () => {
    const MockOverlay = () => {
      const { startRedirect, stopRedirect } = useBookingStore();

      useEffect(() => {
        startRedirect();

        return () => stopRedirect();
      }, [startRedirect, stopRedirect]);

      return (
        <div style={{ position: 'relative', height: '100vh' }}>
          <PageOverlay />
        </div>
      );
    };

    return <MockOverlay />;
  },
};
