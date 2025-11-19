import { Container, Typography } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Бронювання турооператора',
  description: 'Управління бронюваннями турооператора',
};

export default async function OperatorBookings() {
  return (
    <Container maxWidth="lg">
      <Typography>Operator bookings</Typography>
    </Container>
  );
}
