import { Container } from '@mui/material';

import { OperatorPage } from '@/pages-layer/operator';

import { authGuard } from '@/features/auth';

import { APP_ROUTE } from '@/shared/constants';

export default async function Operator() {
  await authGuard(APP_ROUTE.OPERATOR, ['operator']);

  return (
    <Container maxWidth="lg">
      <OperatorPage />
    </Container>
  );
}
