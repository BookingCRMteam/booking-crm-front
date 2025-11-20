import type { FC } from 'react';

import { TableBody, TableRow, Typography } from '@mui/material';

import type { Booking } from '../../mock/bookings';
import { TableCellBody } from './styles';

type OperatorBookingTableBodyProps = {
  bookings: Booking[];
};

export const OperatorBookingTableBody: FC<OperatorBookingTableBodyProps> = ({
  bookings,
}) => {
  return (
    <TableBody>
      {bookings.map(({ customer, data, id, phone, price, title }) => (
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
            <Typography variant="bodyDefault">{data}</Typography>
          </TableCellBody>
          <TableCellBody align="left">
            <Typography variant="bodyDefault">₴ {price}</Typography>
          </TableCellBody>
        </TableRow>
      ))}
    </TableBody>
  );
};
