import { Box, Button, Container, Grid, Link, Typography } from '@mui/material';

import { CalendarIcon, LoginIcon, MapPinIcon } from '@/shared/icons';
import { TourCard } from '@/shared/ui/TourCard/TourCard';

import { TOUR_CARDS } from './data';

const page = () => {
  return (
    <Container
      sx={{
        maxWidth: 1200,
        m: '0 auto',
        p: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 3,
          }}
        >
          <Typography variant="h1">H1 / Page Title</Typography>
          <Typography variant="h2">H2 / Section Title</Typography>
          <Typography variant="h3">H3 / Block Title</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
          }}
        >
          <Typography variant="bodySmall">Body / Small</Typography>
          <Typography variant="bodyDefault">Body / Default</Typography>
          <Typography variant="bodyLarge">Body / Large</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
          }}
        >
          <Typography variant="buttonPrimary">Button / Primary</Typography>
          <Typography variant="inputPlaceholder">
            Input / Placeholder
          </Typography>
          <Typography variant="labelCaption">Label / Caption</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
          }}
        >
          <Typography variant="tagBadge">Price / Highlight</Typography>
          <Typography variant="priceHighlight">Tag / Badge</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
          }}
        >
          <Typography variant="h3">Icons</Typography>
          <CalendarIcon color="success" fontSize="large" />
          <CalendarIcon color="error" fontSize="medium" />
          <CalendarIcon color="info" fontSize="small" />
          <MapPinIcon color="success" fontSize="large" />
          <MapPinIcon color="error" fontSize="medium" />
          <MapPinIcon color="info" fontSize="small" />
        </Box>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button variant="contained" color="primary">
            Button primary
          </Button>
          <Button variant="contained" disabled color="primary">
            Button primary
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<LoginIcon color="inherit" fontSize="medium" />}
          >
            Вхід
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            disabled
            startIcon={<LoginIcon color="inherit" fontSize="medium" />}
          >
            Вхід
          </Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Link variant="navLink" underline="none" href="#">
            Каталог турів
          </Link>
          <Link variant="navLinkActive" underline="none" href="#">
            Каталог турів
          </Link>
          <Link variant="navLink" underline="none" href="#">
            Як тут все влаштовано
          </Link>
          <Link variant="navLinkActive" underline="none" href="#">
            Як тут все влаштовано
          </Link>
          <Link variant="navLink" underline="none" href="#">
            FAQ для мандрівників
          </Link>
          <Link variant="navLinkActive" underline="none" href="#">
            FAQ для мандрівників
          </Link>
        </Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Typography align="center" variant="h2">
              Картка туру
            </Typography>
          </Grid>
          {TOUR_CARDS.map((tour) => (
            <Grid key={tour.id} size={{ xs: 12, md: 6, lg: 4 }}>
              <TourCard {...tour} key={tour.id} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default page;
