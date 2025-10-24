import { Box, styled } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs';

import { BookingAuthPopover } from './BookingAuthPopover';

const meta: Meta<typeof BookingAuthPopover> = {
  title: 'Features/Booking/BookingAuthPopover',
  component: BookingAuthPopover,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component:
          'Поповер при спробі бронювання туру неавторизованим користувачем',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof BookingAuthPopover>;

const anchorStyles: Partial<CSSStyleDeclaration> = {
  position: 'fixed',
  top: '70%',
  left: '50%',
  width: '0px',
  height: '0px',
};

const StyledContainer = styled(Box)({
  width: '100%',
  height: '100vh',
  position: 'relative',
});

export const DefaultView: Story = {
  render: () => {
    const anchorRef = document.createElement('div');
    Object.assign(anchorRef.style, anchorStyles);
    document.body.appendChild(anchorRef);

    return (
      <StyledContainer>
        <BookingAuthPopover anchorEl={anchorRef} forceOpen />
      </StyledContainer>
    );
  },
};
