import { useEffect, useState } from 'react';

import { Box, styled } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs';

import { BookingOperatorPopover } from './BookingOperatorPopover';

const meta: Meta<typeof BookingOperatorPopover> = {
  title: 'Features/Booking/BookingOperatorPopover',
  component: BookingOperatorPopover,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component:
          'Поповер при спробі бронювання туру користувачем з роллю "оператор"',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof BookingOperatorPopover>;

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
      <BookingOperatorPopover anchorEl={anchorEl} forceOpen />
    </StyledContainer>
  );
};

export const DefaultView: Story = {
  render: () => <AnchorHost />,
};
