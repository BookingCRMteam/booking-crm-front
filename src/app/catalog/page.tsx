import { Box, Container, Typography } from '@mui/material';

export default function Catalog() {
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
          Catalog page
        </Typography>
      </Box>
    </Container>
  );
}
