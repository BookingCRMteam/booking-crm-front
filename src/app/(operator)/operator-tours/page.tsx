import { Container } from '@mui/material';
import type { Metadata } from 'next';

import { OperatorMyToursPage } from '@/pages-layer/operator-my-tours';

export const metadata: Metadata = {
  title: 'Тури турооператора',
  description: 'Управління турами турооператора',
};

export default function OperatorTours() {
  return (
    <Container maxWidth="lg">
      <OperatorMyToursPage />
    </Container>
  );
}
