import { Box, Container, Typography } from '@mui/material';

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
        <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
          Hello Booking CRM team! &#128512;
        </Typography>
      </Box>
    </Container>
  );
}
