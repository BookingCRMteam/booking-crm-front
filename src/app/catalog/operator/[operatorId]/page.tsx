import { notFound } from 'next/navigation';

import { Container } from '@mui/material';

import { OperatorPublicPage } from '@/pages-layer/operator-public';

import { operatorApi } from '@/entities/operator/api/operatorApi';
import { fetchToursByOperator } from '@/entities/tour';

import { logger } from '@/shared/lib/logger';

export const revalidate = 3600;

export default async function OperatorPage({
  params,
}: {
  params: Promise<{ operatorId: string }>;
}) {
  const { operatorId } = await params;
  const numericId = Number(operatorId);

  if (Number.isNaN(numericId)) notFound();

  try {
    const [operator, tours] = await Promise.all([
      operatorApi.getOperatorById(numericId),
      fetchToursByOperator({ operatorId: numericId, limit: 6, offset: 0 }),
    ]);

    if (!operator) {
      notFound();
    }

    return (
      <Container maxWidth="lg">
        <OperatorPublicPage operator={operator} initialTours={tours} />
      </Container>
    );
  } catch (error) {
    logger.error(error);
    notFound();
  }
}
