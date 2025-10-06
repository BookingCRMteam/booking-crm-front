import { Container } from '@mui/material';

import { OperatorPublicPage } from '@/pages-layer/operator-public';

export default async function OperatorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Container maxWidth="lg">
      <OperatorPublicPage id={id} />
    </Container>
  );
}
