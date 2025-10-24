import { useState } from 'react';

import { Box, Button, Stack, Typography, styled } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs';

import { useBookingStore } from '@/shared/store';
import { resetAllStores } from '@/shared/tests';
import { StorybookProviderWrapper } from '@/shared/tests/StorybookProviderWrapper';

import {
  mockTourData,
  mockUserOperator,
  mockUserTraveler,
} from '../../mocks/data';
import { BookingButton } from './BookingButton';

const meta: Meta<typeof BookingButton> = {
  title: 'Features/Booking/BookingButton',
  component: BookingButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Кнопка для бронювання туру з різною поведінкою для неавторизованого користувача, оператора та авторизованого користувача.',
      },
    },
  },
  argTypes: {
    isAvailable: { control: 'boolean', description: 'Доступність кнопки' },
    onClick: { action: 'clicked' },
  },
};

export default meta;

const StyledContainer = styled(Box)({
  width: '300px',
  margin: '80px auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
});

type UserType = 'guest' | 'operator' | 'traveler';

export const Interactive: StoryObj<typeof BookingButton> = {
  args: {
    isAvailable: true,
  },
  decorators: [
    (Story) => {
      resetAllStores();
      return <Story />;
    },
  ],
  render: (args) => {
    const [userType, setUserType] = useState<UserType>('guest');
    const { openBookingModal, openAuthPopover, openOperatorPopover } =
      useBookingStore();

    const handleClick = () => {
      if (userType === 'guest') openAuthPopover();
      else if (userType === 'operator') openOperatorPopover();
      else openBookingModal(mockTourData);
    };

    const getUserMock = () => {
      if (userType === 'operator') return mockUserOperator;
      if (userType === 'traveler') return mockUserTraveler;
      return null;
    };

    const token = userType === 'guest' ? null : 'mock-token';
    const userMock = getUserMock();

    return (
      <StorybookProviderWrapper
        token={token}
        setQueryMocks={(qc) =>
          userMock && qc.setQueryData(['user', 'me'], userMock)
        }
      >
        <StyledContainer>
          <Typography variant="bodyLarge">
            Поточний користувач: <strong>{userType}</strong>
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button
              variant={userType === 'guest' ? 'contained' : 'outlined'}
              onClick={() => setUserType('guest')}
            >
              Гість
            </Button>
            <Button
              variant={userType === 'operator' ? 'contained' : 'outlined'}
              onClick={() => setUserType('operator')}
            >
              Оператор
            </Button>
            <Button
              variant={userType === 'traveler' ? 'contained' : 'outlined'}
              onClick={() => setUserType('traveler')}
            >
              Пара
            </Button>
          </Stack>

          <BookingButton {...args} onClick={handleClick} />
        </StyledContainer>
      </StorybookProviderWrapper>
    );
  },
};
