import type { FC } from 'react';

import { TableBody, TableRow, Typography } from '@mui/material';

import type { Booking } from '../../mock/bookings';
import { TableCellBody } from './styles';

type OperatorBookingTableBodyProps = {
  bookings: Booking[];
};

export const CURRENCY_SYMBOL = '₴';

export const OperatorBookingTableBody: FC<OperatorBookingTableBodyProps> = ({
  bookings,
}) => {
  return (
    <TableBody>
      {bookings.map(({ customer, date, id, phone, price, title }) => (
        <TableRow key={id}>
          <TableCellBody component="th" scope="row">
            <Typography variant="bodyDefault">{title}</Typography>
          </TableCellBody>
          <TableCellBody align="left">
            <Typography variant="bodyDefault">{customer}</Typography>
          </TableCellBody>
          <TableCellBody align="left">
            <Typography variant="bodyDefault">{phone}</Typography>
          </TableCellBody>
          <TableCellBody align="left">
            <Typography variant="bodyDefault">{date}</Typography>
          </TableCellBody>
          <TableCellBody align="left">
            <Typography variant="bodyDefault">
              {CURRENCY_SYMBOL} {price}
            </Typography>
          </TableCellBody>
        </TableRow>
      ))}
    </TableBody>
  );
};
