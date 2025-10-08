import type { FC } from 'react';

import { Typography, TypographyProps, styled } from '@mui/material';

type BadgeProps = {
  isAvailable: boolean;
  availableSpots: number;
};

interface AvailabilityBadgeType extends TypographyProps {
  isAvailable: boolean;
}

const StyledBadge = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isAvailable',
})<AvailabilityBadgeType>(({ theme, isAvailable }) => ({
  padding: '6px 8px',
  borderRadius: '4px',
  width: 'fit-content',
  backgroundColor: isAvailable
    ? theme.palette.accent[2]
    : theme.palette.accent[1],
  whiteSpace: 'pre-line',
}));

export const AvailabilityBadge: FC<BadgeProps> = ({
  isAvailable,
  availableSpots,
}) => {
  const text = isAvailable
    ? `Залишилось\n${availableSpots} вільних місця`
    : 'Всі місця\nзаброньовано';

  return (
    <StyledBadge
      variant="priceHighlight"
      align="center"
      component="p"
      isAvailable={isAvailable}
    >
      {text}
    </StyledBadge>
  );
};
