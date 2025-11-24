import { Container } from '@mui/material';

import { OperatorMyToursFormPage } from '@/pages-layer/operator-my-tours';

export default function page({ params }: { params: { tourId: string } }) {
  const tourId = Number(params.tourId);

  return (
    <Container maxWidth="lg">
      <OperatorMyToursFormPage tourId={tourId} />
    </Container>
  );
}
