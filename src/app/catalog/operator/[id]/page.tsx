import React from 'react';

import { notFound } from 'next/navigation';

import { Container } from '@mui/material';

import { OperatorPublicPage } from '@/pages-layer/operator-public';

import { operatorApi } from '@/entities/operator/api/operatorApi';
import { OperatorById } from '@/entities/operator/api/types';

import { logger } from '@/shared/lib/logger';

export const dynamic = 'force-dynamic';

export default async function OperatorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let operator: OperatorById | null = null;

  const { id } = await params;

  try {
    operator = await operatorApi.getOperatorById(id);
    if (!operator) {
      notFound();
    }
    logger.info('[OperatorPage] Operator fetched successfully', {
      operatorId: id,
    });
  } catch (error) {
    logger.error('[OperatorPage] Failed to fetch operator', {
      operatorId: id,
      error: error instanceof Error ? error.message : String(error),
    });
    notFound();
  }

  return (
    <Container maxWidth="lg">
      <OperatorPublicPage operator={operator} />
    </Container>
  );
}
