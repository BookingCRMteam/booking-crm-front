import { Box, Container, Typography } from '@mui/material';

export default function Faq() {
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
          faq
        </Typography>
      </Box>
    </Container>
  );
}
