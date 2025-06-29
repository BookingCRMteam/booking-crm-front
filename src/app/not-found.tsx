import Link from 'next/link';
import { Container, Typography, Box, Button } from '@mui/material';

export default function NotFound() {
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
        <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
          Not Found
        </Typography>
        <Typography variant="h4" component="p" sx={{ mb: 2 }}>
          Could not find requested resource
        </Typography>
        <Button component={Link} href="/" variant="contained" color="primary">
          Return Home
        </Button>
      </Box>
    </Container>
  );
}
