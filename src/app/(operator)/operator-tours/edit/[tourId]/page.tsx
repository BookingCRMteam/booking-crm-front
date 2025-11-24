import { notFound } from 'next/navigation';

import { Container } from '@mui/material';

import { OperatorMyToursFormPage } from '@/pages-layer/operator-my-tours';

export default async function Page({
  params,
}: {
  params: Promise<{ tourId: string }>;
}) {
  const { tourId } = await params;
  const numericId = Number(tourId);

  if (Number.isNaN(numericId)) notFound();

  return (
    <Container maxWidth="lg">
      <OperatorMyToursFormPage tourId={numericId} />
    </Container>
  );
}
