'use client';

import { useState } from 'react';

import { Container, ToggleButton } from '@mui/material';
import { CheckFatIcon } from '@phosphor-icons/react';

import { OPERATOR_BOOKINGS } from '../mock/bookings';
import { OperatorBookingEmpty } from './OperatorBookingEmpty/OperatorBookingEmpty';
import { OperatorBookingItems } from './OperatorBookingItems/OperatorBookingItems';

export const OperatorBookingPage = () => {
  const [isBookingEmpty, setIsBookingEmpty] = useState(false);
  const toggleBookingEmpty = () => setIsBookingEmpty(!isBookingEmpty);
  return (
    <Container maxWidth="lg">
      <ToggleButton
        selected={isBookingEmpty}
        onChange={toggleBookingEmpty}
        value="empty"
      >
        <CheckFatIcon />
      </ToggleButton>
      {isBookingEmpty ? (
        <OperatorBookingEmpty />
      ) : (
        <OperatorBookingItems bookings={OPERATOR_BOOKINGS} />
      )}
    </Container>
  );
};
