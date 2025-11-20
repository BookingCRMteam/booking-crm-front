import { TableHead, TableRow, Typography } from '@mui/material';

import { OPERATOR_BOOKING_TABLE_COLUMNS } from './constants';
import { TableCellHead } from './styles';

export const OperatorBookingTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        {OPERATOR_BOOKING_TABLE_COLUMNS.map(({ label, width }) => (
          <TableCellHead key={label} align="left" sx={{ width }}>
            <Typography variant="bodyLarge">{label}</Typography>
          </TableCellHead>
        ))}
      </TableRow>
    </TableHead>
  );
};
