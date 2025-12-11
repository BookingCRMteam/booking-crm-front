import { Box, styled } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { PaymentFailed } from './PaymentFailed';

const CenteredContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  padding: '40px',
  maxWidth: '457px',
  margin: '0 auto',
});

const meta: Meta<typeof PaymentFailed> = {
  title: 'Features/Booking/Payment/PaymentFailed',
  component: PaymentFailed,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Контент, який показується у випадку невдалого платежу.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PaymentFailed>;

export const Default: Story = {
  render: () => (
    <CenteredContainer>
      <PaymentFailed />
    </CenteredContainer>
  ),
};
