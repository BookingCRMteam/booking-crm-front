import { Container } from '@mui/material';

import { CatalogPage } from '@/pages-layer/catalog/ui/CatalogPage';

import { fetchTours } from '@/entities/tour/api/toursApi';

export const dynamic = 'force-dynamic';

export default async function Catalog() {
  const tours = await fetchTours({ limit: 6, offset: 0 });
  return (
    <Container maxWidth={'lg'}>
      <CatalogPage initialData={tours} />
    </Container>
  );
}
