import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  Container,
  Grid,
  Link,
  Typography,
} from '@mui/material';

import { CalendarIcon, LoginIcon, MapPinIcon } from '@/shared/icons';
import { TourCard } from '@/shared/ui/TourCard/TourCard';

import { TOUR_CARDS } from './data';

export default function UIKitPage() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
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
          <Typography variant="tagBadge">Tag / Badge</Typography>
          <Typography variant="priceHighlight">Price / Highlight</Typography>
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
        <Box
          sx={{
            display: 'flex',
            gap: 3,
          }}
        >
          <Typography variant="h3">Checkbox</Typography>
          <Checkbox {...label} />
          <Checkbox {...label} defaultChecked />
          <Checkbox {...label} disabled />
          <Checkbox {...label} defaultChecked disabled />
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
          }}
        >
          <Typography variant="h3">BreadCrumbs</Typography>
          <Breadcrumbs
            separator={<ArrowForwardIosRoundedIcon sx={{ fontSize: '16px' }} />}
            aria-label="breadcrumb"
          >
            <Link
              underline="none"
              variant="breadcrumbLink"
              color="inherit"
              href="#"
            >
              Головна
            </Link>
            <Link
              underline="none"
              variant="breadcrumbLink"
              color="inherit"
              href="#"
            >
              Каталог
            </Link>
            <Typography variant="labelCaption" color="textPrimary">
              Каталог
            </Typography>
          </Breadcrumbs>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
          }}
        >
          <Typography variant="h3">Links</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              padding: '20px',
              border: '1px dashed #9747ff',
              borderRadius: '5px',
            }}
          >
            <Typography>variant link</Typography>
            <Link variant="link">support@pairedpaths.com</Link>
            <Typography>variant navLink</Typography>
            <Link variant="navLink" underline="none">
              support@pairedpaths.com
            </Link>
            <Typography>variant navLinkActive</Typography>
            <Link variant="navLinkActive">support@pairedpaths.com</Link>
          </Box>
        </Box>
        <Typography variant="h2" align="center">
          Buttons Primary
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Button variant="contained" size="large" color="primary">
            Large
          </Button>
          <Button variant="contained" size="large" disabled color="primary">
            Large
          </Button>
          <Button variant="contained" color="primary" size="medium">
            medium
          </Button>
          <Button variant="contained" color="primary" disabled size="medium">
            medium
          </Button>
          <Button variant="contained" color="primary" size="small">
            small
          </Button>
          <Button variant="contained" color="primary" disabled size="small">
            small
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            startIcon={<ChevronLeftIcon />}
            endIcon={<ChevronRightIcon />}
          >
            Label
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            startIcon={<ChevronLeftIcon />}
            endIcon={<ChevronRightIcon />}
          >
            label
          </Button>
          <Button
            variant="contained"
            size="small"
            color="primary"
            startIcon={<ChevronLeftIcon />}
            endIcon={<ChevronRightIcon />}
          >
            label
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
        <Typography variant="h2" align="center">
          Buttons Secondary
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Button variant="outlined" size="large" color="secondary">
            Large
          </Button>
          <Button variant="outlined" size="large" disabled color="secondary">
            Large
          </Button>
          <Button variant="outlined" color="secondary" size="medium">
            medium
          </Button>
          <Button variant="outlined" color="secondary" disabled size="medium">
            medium
          </Button>
          <Button variant="outlined" color="secondary" size="small">
            small
          </Button>
          <Button variant="outlined" color="secondary" disabled size="small">
            small
          </Button>
          <Button
            variant="outlined"
            size="large"
            color="secondary"
            startIcon={<ChevronLeftIcon />}
            endIcon={<ChevronRightIcon />}
          >
            Label
          </Button>
          <Button
            variant="outlined"
            size="medium"
            color="secondary"
            startIcon={<ChevronLeftIcon />}
            endIcon={<ChevronRightIcon />}
          >
            label
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            startIcon={<ChevronLeftIcon />}
            endIcon={<ChevronRightIcon />}
          >
            label
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            startIcon={<LoginIcon color="inherit" fontSize="medium" />}
          >
            Вхід
          </Button>
          <Button
            variant="outlined"
            color="secondary"
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
              <TourCard tour={tour} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
