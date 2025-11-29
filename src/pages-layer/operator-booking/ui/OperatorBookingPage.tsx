import { Container } from '@mui/material';

import { ContentRenderer } from './ContentRenderer/ContentRenderer';

export const OperatorBookingPage = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: 'calc(100vh - 60px)',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <ContentRenderer />
    </Container>
  );
};
