import type { FC } from 'react';

import { TableContainer, Typography } from '@mui/material';

import type { Booking } from '../../mock/bookings';
import { OperatorBookingTableBody } from './TableBody';
import { OperatorBookingTableHead } from './TableHead';
import { OPERATOR_BOOKING_ITEMS_TITLE } from './constants';
import { OperatorBookingTable, OperatorBookingWrapper } from './styles';

type OperatorBookingItemsProps = {
  bookings: Booking[];
};

export const OperatorBookingItems: FC<OperatorBookingItemsProps> = ({
  bookings,
}) => {
  return (
    <OperatorBookingWrapper>
      <Typography variant="h1" component="h1">
        {OPERATOR_BOOKING_ITEMS_TITLE}
      </Typography>
      <TableContainer>
        <OperatorBookingTable aria-label="bookings table">
          <OperatorBookingTableHead />
          <OperatorBookingTableBody bookings={bookings} />
        </OperatorBookingTable>
      </TableContainer>
    </OperatorBookingWrapper>
  );
};
