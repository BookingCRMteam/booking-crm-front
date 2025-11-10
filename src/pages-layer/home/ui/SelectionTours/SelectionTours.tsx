'use client';

import {
  Box,
  Container,
  type ContainerProps,
  Grid,
  Typography,
  styled,
} from '@mui/material';

import { useFetchTours } from '@/entities/tour';

import { TourCard, TourCardSkeleton } from '@/shared/ui';

import { SKELETON_ARRAY } from '../constants';
import {
  SELECTION_TOURS_DESCRIPTION,
  SELECTION_TOURS_TITLE,
} from './constants';

const SelectionWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.accent[2],
  minHeight: '852px',
}));

const ToursWrapper = styled(Container)<ContainerProps>({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  padding: '40px 0 60px',
});

const TitleWrapper = styled(Box)({
  display: 'flex',
  margin: '0 auto',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  maxWidth: '681px',
});

export const SelectionTours = () => {
  const {
    data: tours,
    isLoading,
    isSuccess,
    isError,
  } = useFetchTours({ limit: 3 });
  return (
    <SelectionWrapper>
      <ToursWrapper maxWidth="lg" component="section">
        <TitleWrapper>
          <Typography variant="h2">{SELECTION_TOURS_TITLE}</Typography>
          <Typography component="p" variant="bodyLarge" align="center">
            {SELECTION_TOURS_DESCRIPTION}
          </Typography>
        </TitleWrapper>
        <Grid container spacing={3}>
          {(isLoading || isError) &&
            SKELETON_ARRAY.map((skeleton) => (
              <Grid key={skeleton.id} size={{ md: 4 }}>
                <TourCardSkeleton />
              </Grid>
            ))}
          {isSuccess &&
            tours.data.map((tour) => (
              <Grid key={tour.id} size={{ md: 4 }}>
                <TourCard
                  id={tour.id}
                  title={tour.title}
                  availableSpots={tour.availableSpots}
                  price={tour.price}
                  photos={tour.photos}
                  startDate={tour.startDate}
                  endDate={tour.endDate}
                  countryName={
                    tour.country.translations?.[0]?.name ?? 'Unknown'
                  }
                  operator={{
                    id: tour.operator.id,
                    name: `${tour.operator.firstName} ${tour.operator.lastName}`,
                    photo: tour.operator.photo,
                  }}
                />
              </Grid>
            ))}
        </Grid>
      </ToursWrapper>
    </SelectionWrapper>
  );
};
