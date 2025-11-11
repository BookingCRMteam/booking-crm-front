'use client';

import { Box, Typography, TypographyProps, styled } from '@mui/material';
import { MapPinLineIcon } from '@phosphor-icons/react';

type LocationDisplayProps = {
  location: string;
};

const LocationContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

const LocationText = styled(Typography)<TypographyProps>({
  fontFamily: 'Inter',
  lineHeight: '1',
  transform: 'translateY(1px)',
  letterSpacing: '0.04em',
});

export const LocationDisplay = ({ location }: LocationDisplayProps) => {
  return (
    <LocationContainer>
      <MapPinLineIcon size={24} color="#007A78" data-testid="location-icon" />
      <LocationText variant="bodyDefault" component="p">
        {location}
      </LocationText>
    </LocationContainer>
  );
};
