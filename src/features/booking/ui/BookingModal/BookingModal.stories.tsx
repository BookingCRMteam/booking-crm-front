import React, { useEffect } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import { useBookingStore } from '@/shared/store';
import { StorybookProviderWrapper } from '@/shared/tests/StorybookProviderWrapper';

import { mockTourData, mockUserTraveler } from '../../mocks/data';
import { BookingModal } from './BookingModal';

const meta: Meta<typeof BookingModal> = {
  title: 'Features/Booking/BookingModal',
  component: BookingModal,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: 'Модальне вікно бронювання — різні стани даних користувача.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof BookingModal>;

const useMockTourData = () => {
  const { openBookingModal } = useBookingStore();

  useEffect(() => {
    openBookingModal(mockTourData);
  }, [openBookingModal]);
};

export const WithoutUserData: Story = {
  render: () => {
    useMockTourData();
    return (
      <StorybookProviderWrapper token={null} setQueryMocks={() => {}}>
        <BookingModal forceOpen disableSubmit />
      </StorybookProviderWrapper>
    );
  },
};

export const WithUserData: Story = {
  render: () => {
    useMockTourData();
    return (
      <StorybookProviderWrapper
        token="mock-token"
        setQueryMocks={(qc) =>
          qc.setQueryData(['user', 'me'], mockUserTraveler)
        }
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <BookingModal forceOpen disableSubmit />
        </form>
      </StorybookProviderWrapper>
    );
  },
};
