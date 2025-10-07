import React from 'react';

import { notFound } from 'next/navigation';

import { Container } from '@mui/material';

import { OperatorPublicPage } from '@/pages-layer/operator-public';

import { operatorApi } from '@/entities/operator/api/operatorApi';

export default async function OperatorPage({
  params,
}: {
  params: { id: string };
}) {
  let operator = null;

  try {
    operator = await operatorApi.getOperatorById(params.id);
  } catch (error) {
    console.error(error);
    notFound();
  }

  return (
    <Container maxWidth="lg">
      <OperatorPublicPage operator={operator} />
    </Container>
  );
}
