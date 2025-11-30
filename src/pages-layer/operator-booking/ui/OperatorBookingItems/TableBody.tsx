import type { FC } from 'react';

import { TableBody, TableRow, Typography } from '@mui/material';

import type { OperatorPaidBooking } from '@/entities/operator';

import { formattedDate } from '@/shared/utils';

import { TableCellBody } from './styles';

type OperatorBookingTableBodyProps = {
  bookings: OperatorPaidBooking[];
};

export const CURRENCY_SYMBOL = '₴';

export const OperatorBookingTableBody: FC<OperatorBookingTableBodyProps> = ({
  bookings,
}) => {
  return (
    <TableBody>
      {bookings.map(
        ({
          bookingId,
          customerName,
          customerPhone,
          endDate,
          startDate,
          totalPriceUAH,
          tourTitle,
        }) => (
          <TableRow key={bookingId}>
            <TableCellBody component="th" scope="row">
              <Typography variant="bodyDefault">{tourTitle}</Typography>
            </TableCellBody>
            <TableCellBody align="left">
              <Typography variant="bodyDefault">{customerName}</Typography>
            </TableCellBody>
            <TableCellBody align="left">
              <Typography variant="bodyDefault">{customerPhone}</Typography>
            </TableCellBody>
            <TableCellBody align="left">
              <Typography variant="bodyDefault">
                {formattedDate(startDate)} — {formattedDate(endDate)}
              </Typography>
            </TableCellBody>
            <TableCellBody align="left">
              <Typography variant="bodyDefault">
                {CURRENCY_SYMBOL} {totalPriceUAH}
              </Typography>
            </TableCellBody>
          </TableRow>
        ),
      )}
    </TableBody>
  );
};
