'use client';

import type { FC } from 'react';

import { Box, Typography, TypographyProps, styled } from '@mui/material';

import { BookingButton } from '@/features/booking';

import { CalendarIcon, MapPinIcon } from '@/shared/icons';

import { AvailabilityBadge } from '../AvailabilityBadge/AvailabilityBadge';
import { OperatorLink } from '../OperatorLink/OperatorLink';
import { PriceDisplay } from '../PriceDisplay/PriceDisplay';

const ControlWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  paddingTop: '20px',
});

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

const MetaItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

const CountryAndCity = styled(Typography)<TypographyProps>({
  fontFamily: 'Inter',
  lineHeight: '1',
  transform: 'translateY(1px)',
  letterSpacing: '0.04em',
});

type TourControlProps = {
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
};

const TourControl: FC<TourControlProps> = ({
  title,
  countryAndCity,
  date,
  price,
  availableSpots,
  operator,
}) => {
  const isAvailable = availableSpots !== 0;

  return (
    <ControlWrapper>
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
            <MetaItem>
              <MapPinIcon fontSize="medium" color="primary" />
              <CountryAndCity variant="bodyDefault" component="p">
                {countryAndCity}
              </CountryAndCity>
            </MetaItem>
            <MetaItem gap={1}>
              <CalendarIcon fontSize="medium" color="primary" />
              <Typography
                variant="bodyLarge"
                component="p"
                sx={{ fontFamily: 'Inter', letterSpacing: '0.035em' }}
              >
                {date}
              </Typography>
            </MetaItem>
          </MetaGroup>

          <AvailabilityBadge availableSpots={availableSpots} />
        </InfoRow>
        <PriceDisplay price={price} />
      </InfoSection>
      <OperatorLink {...operator} />
      <BookingButton isAvailable={isAvailable} />
    </ControlWrapper>
  );
};

export default TourControl;
