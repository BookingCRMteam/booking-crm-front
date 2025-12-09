import { useEffect, useState } from 'react';

import { Box, styled } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

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

const AnchorHost = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.createElement('div');
    Object.assign(el.style, anchorStyles);
    document.body.appendChild(el);
    setAnchorEl(el);

    return () => {
      el.remove();
    };
  }, []);

  return (
    <StyledContainer>
      <BookingAuthPopover anchorEl={anchorEl} forceOpen />
    </StyledContainer>
  );
};

export const DefaultView: Story = {
  render: () => <AnchorHost />,
};
