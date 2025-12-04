import type { FC } from 'react';

import Image from 'next/image';

import { Box, Container, Grid } from '@mui/material';

import { BookingStatusListener } from '@/features/booking/ui/BookingStatusListener/BookingStatusListener';
import { TourGallery } from '@/features/tour-gallery';

import { mapTourToViewModel } from '@/entities/tour';
import type { Tour } from '@/entities/tour';

import { APP_ROUTE } from '@/shared/constants';
import { DYNAMIC_ROUTE } from '@/shared/constants';
import { BreadCrumbs } from '@/shared/ui';

import TourControl from './TourControl/TourControl';
import TourDescription from './TourDescription';

const DEFAULT_IMAGE_URL = '/images/tourCard/tour.png';

export type TourPageProps = {
  tour: Tour;
};

export const TourPage: FC<TourPageProps> = ({ tour }) => {
  const {
    title,
    countryAndCity,
    date,
    id,
    operatorInfo,
    photos,
    availableSpots,
    description,
    price,
  } = mapTourToViewModel(tour);
  const breadcrumbsItems = [
    { href: APP_ROUTE.HOME, title: 'Головна' },
    { href: APP_ROUTE.CATALOG, title: 'Каталог' },
    { href: DYNAMIC_ROUTE.TOUR(id), title: title },
  ];

  const tourGalleryBlock = !!photos.length ? (
    <TourGallery photos={photos} />
  ) : (
    <Box sx={{ width: '100%', maxWidth: '419px', p: '20px 0' }}>
      <Image
        alt="Резервне фото туру"
        src={DEFAULT_IMAGE_URL}
        width={419}
        height={440}
      />
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ paddingBottom: '60px' }}>
      <BreadCrumbs items={breadcrumbsItems} />
      <Grid container rowSpacing="54px" columnSpacing={3}>
        <Grid size={{ xs: 6 }}>{tourGalleryBlock}</Grid>
        <Grid size={{ xs: 5 }} offset={{ xs: 1 }}>
          <TourControl
            tourId={id}
            title={title}
            countryAndCity={countryAndCity}
            availableSpots={availableSpots}
            date={date}
            operator={operatorInfo}
            price={price}
          />
        </Grid>
        <Grid size={{ xs: 8 }} offset={{ xs: 2 }} justifyItems="center">
          <TourDescription description={description} />
        </Grid>
      </Grid>

      <BookingStatusListener tourId={id} />
    </Container>
  );
};
