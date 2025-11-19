import { Container, Typography } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Тури турооператора',
  description: 'Управління турами турооператора',
};

export default async function OperatorTours() {
  return (
    <Container maxWidth="lg">
      <Typography>Operator tours</Typography>
    </Container>
  );
}
