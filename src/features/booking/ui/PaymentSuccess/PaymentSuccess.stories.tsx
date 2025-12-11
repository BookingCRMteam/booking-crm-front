import { Box, styled } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { mockPaidBooking } from '@/shared/tests';

import { PaymentSuccess } from './PaymentSuccess';

const CenteredContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  padding: '40px',
  maxWidth: '592px',
  margin: '0 auto',
});

const meta: Meta<typeof PaymentSuccess> = {
  title: 'Features/Booking/Payment/PaymentSuccess',
  component: PaymentSuccess,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Контент, який показується у випадку успішного платежу.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PaymentSuccess>;

export const Default: Story = {
  render: () => (
    <CenteredContainer>
      <PaymentSuccess data={mockPaidBooking} />
    </CenteredContainer>
  ),
};
