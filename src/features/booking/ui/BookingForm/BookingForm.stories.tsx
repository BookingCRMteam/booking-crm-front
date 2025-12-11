import { Box, styled } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { useBookingStore } from '@/shared/store';
import { mockUserTraveler } from '@/shared/tests';
import { StorybookProviderWrapper } from '@/shared/tests/StorybookProviderWrapper';

import { BookingForm } from './BookingForm';

const StyledContainer = styled(Box)({
  maxWidth: 800,
  marginTop: '50px',
  marginInline: 'auto',
});

const meta: Meta<typeof BookingForm> = {
  title: 'Features/Booking/BookingForm',
  component: BookingForm,
};

export default meta;

type Story = StoryObj<typeof BookingForm>;

export const EmptyForm: Story = {
  decorators: [
    (Story) => {
      useBookingStore.getState().reset();
      return <Story />;
    },
  ],
  render: () => (
    <StorybookProviderWrapper
      token={null}
      setQueryMocks={(qc) => qc.setQueryData(['user', 'me'], null)}
    >
      <StyledContainer>
        <BookingForm disableSubmit />
      </StyledContainer>
    </StorybookProviderWrapper>
  ),
};

export const PrefilledForm: Story = {
  decorators: [
    (Story) => {
      useBookingStore.getState().reset();
      return <Story />;
    },
  ],
  render: () => {
    return (
      <StorybookProviderWrapper
        token="mock-token"
        setQueryMocks={(qc) =>
          qc.setQueryData(['user', 'me'], mockUserTraveler)
        }
      >
        <StyledContainer>
          <BookingForm />
        </StyledContainer>
      </StorybookProviderWrapper>
    );
  },
};
