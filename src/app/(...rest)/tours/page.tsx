import { Box, Container, Grid, Typography } from '@mui/material';

import TourCard from '@/components/TourCard/TourCard';

import { TOURS, Tour } from '@/shared/types/tour';

// Імітація асинхронного отримання даних
async function getTours(): Promise<Tour[]> {
  return Promise.resolve(TOURS);
}

export default async function ToursPage() {
  const tours = await getTours();

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
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Доступні тури
        </Typography>
        <Grid container spacing={3}>
          {tours.map((tour) => (
            <Grid size={{ xs: 6, md: 4 }} key={tour.id}>
              <TourCard tour={tour} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
