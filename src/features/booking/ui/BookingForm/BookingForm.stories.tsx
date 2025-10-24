import { Box, styled } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs';

import { resetAllStores } from '@/shared/tests';
import { StorybookProviderWrapper } from '@/shared/tests/StorybookProviderWrapper';

import { mockUserTraveler } from '../../mocks/data';
import { BookingForm } from './BookingForm';

const StyledContainer = styled(Box)({
  maxWidth: 800,
  marginTop: '50px',
  marginInline: 'auto',
});

const meta: Meta<typeof BookingForm> = {
  title: 'Features/Booking/BookingForm',
  component: BookingForm,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component:
          'Форма, яку користувач заповнює своїми даними при бронюванні туру. Має валідацію та відправку форми.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof BookingForm>;

export const EmptyForm: Story = {
  decorators: [
    (Story) => {
      resetAllStores();
      return <Story />;
    },
  ],
  render: () => (
    <StorybookProviderWrapper
      token="mock-token"
      setQueryMocks={(qc) => qc.setQueryData(['user', 'me'], null)}
    >
      <StyledContainer>
        <BookingForm />
      </StyledContainer>
    </StorybookProviderWrapper>
  ),
};

export const PrefilledForm: Story = {
  decorators: [
    (Story) => {
      resetAllStores();
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
