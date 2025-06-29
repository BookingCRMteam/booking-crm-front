import { Container, Typography, Box } from '@mui/material';
import CheckStatusApi from '@/features/health/components/CheckStatusApi';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Hello Booking CRM team! &#128512;
        </Typography>
        <CheckStatusApi />
      </Box>
    </Container>
  );
}
