'use client';

import type { FC } from 'react';

import Image from 'next/image';

import { Box, Container, Grid, styled } from '@mui/material';

import { BookingStatusListener } from '@/features/booking/ui/BookingStatusListener/BookingStatusListener';
import { TourGallery } from '@/features/tour-gallery';

import { BookingStatus } from '@/entities/booking';
import type { TourPhoto } from '@/entities/tour';

import { APP_ROUTE } from '@/shared/constants';
import { DYNAMIC_ROUTE } from '@/shared/constants';
import { BreadCrumbs } from '@/shared/ui';

import { TourBookingControl } from '../TourBookingControl/TourBookingControl';
import TourControl from '../TourControl/TourControl';
import TourDescription from '../TourDescription/TourDescription';
import { TourInfo } from '../TourInfo/TourInfo';

const DEFAULT_IMAGE_URL = '/images/tourCard/tour.png';
const ControlWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  paddingTop: '20px',
});

export type TourPageProps = {
  variant?: 'booking' | 'catalog';
  title: string;
  countryAndCity: string;
  date: string;
  id: number;
  operatorInfo: {
    id: number;
    name: string;
    photo: string | null;
  };
  photos: Pick<TourPhoto, 'url' | 'description' | 'isMain'>[];
  availableSpots: number;
  description: string;
  price: string;
  bookingStatus?: BookingStatus;
  bookingId?: number;
};

export const TourPage: FC<TourPageProps> = ({
  title,
  countryAndCity,
  date,
  id,
  operatorInfo,
  photos,
  availableSpots,
  description,
  price,
  variant = 'catalog',
  bookingStatus,
  bookingId,
}) => {
  const isCatalog = variant === 'catalog';
  const isBooking =
    variant === 'booking' &&
    bookingStatus !== undefined &&
    bookingId !== undefined;
  const breadcrumbsItems = [
    { href: APP_ROUTE.HOME, title: 'Головна' },
    {
      ...(isCatalog
        ? { href: APP_ROUTE.CATALOG, title: 'Каталог' }
        : { href: APP_ROUTE.PROFILE, title: 'Наш профіль' }),
    },
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
          <ControlWrapper>
            <TourInfo
              title={title}
              countryAndCity={countryAndCity}
              availableSpots={availableSpots}
              date={date}
              price={price}
              variant={variant}
              operator={operatorInfo}
            />
            {isCatalog && (
              <TourControl
                title={title}
                countryAndCity={countryAndCity}
                availableSpots={availableSpots}
                date={date}
                price={price}
                tourId={id}
              />
            )}
            {isBooking && (
              <TourBookingControl
                bookingStatus={bookingStatus}
                bookingId={bookingId}
              />
            )}
          </ControlWrapper>
        </Grid>
        <Grid size={{ xs: 8 }} offset={{ xs: 2 }} justifyItems="center">
          <TourDescription description={description} />
        </Grid>
      </Grid>
      {isCatalog && <BookingStatusListener tourId={id} />}
    </Container>
  );
};
