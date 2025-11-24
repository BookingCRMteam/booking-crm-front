import { Container } from '@mui/material';

import { OperatorMyToursFormPage } from '@/pages-layer/operator-my-tours';

type PageProps = {
  params: { tourId: string };
};

export default function page({ params }: PageProps) {
  const tourId = Number(params.tourId);

  return (
    <Container maxWidth="lg">
      <OperatorMyToursFormPage tourId={tourId} />
    </Container>
  );
}
