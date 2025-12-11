import React, { useEffect } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { useBookingStore } from '@/shared/store';
import { mockTourBookingInfo, mockUserTraveler } from '@/shared/tests';
import { StorybookProviderWrapper } from '@/shared/tests/StorybookProviderWrapper';

import { BookingModal } from './BookingModal';

const meta: Meta<typeof BookingModal> = {
  title: 'Features/Booking/BookingModal',
  component: BookingModal,
};

export default meta;

type Story = StoryObj<typeof BookingModal>;

const useMockTourData = () => {
  const { openBookingModal } = useBookingStore();

  useEffect(() => {
    openBookingModal(mockTourBookingInfo);
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
