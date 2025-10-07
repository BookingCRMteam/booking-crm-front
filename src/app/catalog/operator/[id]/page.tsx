import React from 'react';

import { notFound } from 'next/navigation';

import { Container } from '@mui/material';

import { OperatorPublicPage } from '@/pages-layer/operator-public';

import { operatorApi } from '@/entities/operator/api/operatorApi';

interface OperatorPageProps {
  params: {
    id: string;
  };
}

export default async function OperatorPage({ params }: OperatorPageProps) {
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
