import { Container } from '@mui/material';

import { CatalogPage } from '@/pages-layer/catalog copy/ui/CatalogPage';

export default async function Catalog() {
  return (
    <Container maxWidth={'lg'}>
      <CatalogPage />
    </Container>
  );
}
