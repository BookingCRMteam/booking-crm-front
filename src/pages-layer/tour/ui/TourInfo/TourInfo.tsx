import type { FC } from 'react';

import { Box, Typography, styled } from '@mui/material';

import {
  DateDisplay,
  LocationDisplay,
  OperatorLink,
  PriceDisplay,
} from '@/shared/ui';

import { AvailabilityBadge } from '../AvailabilityBadge/AvailabilityBadge';

const InfoSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '21px',
});

const InfoRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
});

const MetaGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

type TourInfoProps = {
  tourId: number;
  title: string;
  price: string;
  countryAndCity: string;
  date: string;
  operator: {
    id: number;
    name: string;
    photo: string | null;
  };
  availableSpots: number;
  variant?: 'booking' | 'catalog';
};

export const TourInfo: FC<TourInfoProps> = ({
  title,
  price,
  countryAndCity,
  date,
  operator,
  availableSpots,
  variant = 'catalog',
}) => {
  return (
    <>
      <Typography
        variant="h2"
        component="h1"
        sx={{ letterSpacing: '-0.01em', lineHeight: '129%' }}
      >
        {title}
      </Typography>
      <InfoSection>
        <InfoRow>
          <MetaGroup>
            <LocationDisplay location={countryAndCity} />
            <DateDisplay date={date} />
          </MetaGroup>
          {variant === 'catalog' && (
            <AvailabilityBadge availableSpots={availableSpots} />
          )}
        </InfoRow>
        <PriceDisplay price={price} />
      </InfoSection>
      <OperatorLink {...operator} variant="page" />
    </>
  );
};
