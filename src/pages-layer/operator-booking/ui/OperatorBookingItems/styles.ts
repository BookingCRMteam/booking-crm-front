'use client';

import { Box, Table, TableCell, styled } from '@mui/material';

const HEADER_HEIGHT = 60;

export const TableCellHead = styled(TableCell)(({ theme }) => ({
  color: theme.palette.primaryExtended[950],
  padding: '11px 10px',
}));

export const TableCellBody = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.black,
  padding: '13.3px 10px',
}));

export const OperatorBookingWrapper = styled(Box)({
  paddingTop: '40px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '40px',
  minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
});

export const OperatorBookingTable = styled(Table)(({ theme }) => ({
  border: `1px solid ${theme.palette.common.black}`,
  '& td, & th': { border: `1px solid ${theme.palette.common.black}` },
  borderCollapse: 'collapse',
}));
