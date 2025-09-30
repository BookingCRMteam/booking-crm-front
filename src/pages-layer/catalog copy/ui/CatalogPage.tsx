'use client';

import { useState } from 'react';

import { Button, Grid } from '@mui/material';

import { TOUR_CARDS } from '@/app/ui-kit/data';

import { TourCard } from '@/shared/ui/TourCard/TourCard';

import { CatalogEmpty } from './CatalogEmpty';

export const CatalogPage = () => {
  const [isTours, setIsTours] = useState(true);
  return (
    <>
      {isTours ? (
        <Grid
          container
          spacing={3}
          sx={{
            pt: '36px',
            pb: 5,
          }}
        >
          {TOUR_CARDS.map((tour) => (
            <Grid key={tour.id} size={{ xs: 12, md: 6, lg: 4 }}>
              <TourCard {...tour} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <CatalogEmpty />
      )}
      <Button onClick={() => setIsTours(!isTours)}>Змінити</Button>
    </>
  );
};
