import { Box, Button, Container, Typography } from '@mui/material';

import Link from 'next/link';

/**
 * Displays a "Not Found" page with a message and a button to return to the home page.
 *
 * Renders a static user interface indicating that the requested resource could not be found.
 */
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
