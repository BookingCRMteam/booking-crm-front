import { Container } from '@mui/material';

import { HEADER_HEIGHT } from '@/shared/constants';

import { ContentRenderer } from './ContentRenderer/ContentRenderer';

export const OperatorBookingPage = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <ContentRenderer />
    </Container>
  );
};
