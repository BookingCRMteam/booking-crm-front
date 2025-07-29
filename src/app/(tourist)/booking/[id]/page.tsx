import { Box, Button, Container, Paper, Typography } from '@mui/material';

import { notFound } from 'next/navigation';

import { TOURS, Tour } from '@/shared/types/tour';

// Імітація асинхронного отримання даних
async function getTour(id: string): Promise<Tour | undefined> {
  return Promise.resolve(TOURS.find((tour) => tour.id === Number(id)));
}

interface BookingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { id } = await params;
  const tour = await getTour(id);

  if (!tour) {
    notFound();
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Бронювання туру
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            {tour.name}
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            {tour.description}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" component="p">
              Локація: {tour.location}
            </Typography>
            <Typography variant="subtitle1" component="p">
              Тривалість: {tour.duration}
            </Typography>
            <Typography variant="subtitle1" component="p">
              Вартість: {tour.price} грн
            </Typography>
          </Box>

          <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
            Включено в тур:
          </Typography>
          <ul>
            {tour.included.map((item, index) => (
              <li key={index}>
                <Typography variant="body1">{item}</Typography>
              </li>
            ))}
          </ul>

          <Box sx={{ mt: 4 }}>
            <Button variant="contained" color="primary" size="large">
              Підтвердити бронювання
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
