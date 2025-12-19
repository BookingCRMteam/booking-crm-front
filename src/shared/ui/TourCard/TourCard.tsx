'use client';

import type { FC } from 'react';

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardProps,
  Typography,
  styled,
} from '@mui/material';
import { CalendarDotsIcon, MapPinLineIcon } from '@phosphor-icons/react';

import { OperatorLink } from '@/shared/ui';
import { formattedDate } from '@/shared/utils';

import Label from './Label';
import { TourCardActions } from './TourCardActions';
import { TourCardImage } from './TourCardImage';
import type { TourCardProps } from './types';

interface CardWrapperProps extends CardProps {
  isAvailable: boolean;
}

const CardWrapper = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isAvailable',
})<CardWrapperProps>(({ theme, isAvailable }) => ({
  width: 331,
  minHeight: 600,
  position: 'relative',
  borderRadius: '4px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  transition: 'all 0.3s ease-in-out',
  boxShadow: 'none',

  ...(isAvailable && {
    '&:has(.MuiButton-root:focus-visible)': {
      outline: `3px solid ${theme.palette.primary.dark}`,
    },
    '&:has(.MuiButton-root:active)': {
      outline: `3px solid ${theme.palette.primary.light}`,
    },
    '&:hover': {
      '& .tour-card-content-wrapper': {
        backgroundColor: 'rgba(54, 54, 54, 0.5)',
      },
      '& .tour-card-image-wrapper': {
        transform: 'scale(1.2) translate(25px, 38px)',
      },
    },
  }),
}));

const ImageWrapper = styled(Box)({
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
  transition: 'transform 0.3s ease-in-out',
  zIndex: 0,
});

const ContentWrapper = styled(Box)({
  zIndex: 1,
  backgroundColor: 'rgba(54, 54, 54, 0.4)',
  padding: '12px 8px 28px',
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  backdropFilter: 'blur(10px)',
});

const CardContentStyle = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  color: theme.palette.common.white,
  padding: 0,
}));

export const TourCard: FC<TourCardProps> = ({
  id,
  title,
  availableSpots,
  operator,
  price,
  photos,
  startDate,
  endDate,
  countryName,
  bookingId,
  bookingCount = 0,
  variant = 'catalog',
}) => {
  const isAvailable = availableSpots > 0;
  const date = `${formattedDate(startDate)} — ${formattedDate(endDate)}`;
  const mainPhoto = photos.find((p) => p.isMain) ?? photos[0];

  return (
    <CardWrapper isAvailable={isAvailable}>
      <ImageWrapper className="tour-card-image-wrapper">
        <TourCardImage mainPhoto={mainPhoto} title={title} />
      </ImageWrapper>

      {variant === 'catalog' && <Label count={availableSpots} />}

      <ContentWrapper className="tour-card-content-wrapper">
        <CardContentStyle>
          <Typography
            align="center"
            variant="h3"
            component="h4"
            sx={{ '&::first-letter': { textTransform: 'uppercase' } }}
          >
            {title}
          </Typography>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              px: '8px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CalendarDotsIcon size={24} />
                <Typography variant="bodyDefault" sx={{ lineHeight: 1 }}>
                  {date}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPinLineIcon size={24} />
                <Typography
                  variant="bodyDefault"
                  sx={{ lineHeight: 1, letterSpacing: '0.04em' }}
                >
                  {countryName}
                </Typography>
              </Box>
            </Box>

            {variant !== 'operator' && (
              <OperatorLink
                variant="card"
                id={operator.id}
                name={operator.name}
                photo={operator.photo}
              />
            )}

            {variant === 'operator' && (
              <Box
                sx={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  pt: '8px',
                  borderTop: '1px solid white',
                }}
              >
                <Typography variant="bodyDefault" sx={{ pl: '8px' }}>
                  Заброньовано:
                </Typography>
                <Typography variant="bodySmall">{`${bookingCount} місць`}</Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Typography variant="priceHighlight">&#x20B4;</Typography>
            <Typography variant="priceHighlight">{price}</Typography>
            <Typography variant="priceHighlight">(за двох)</Typography>
          </Box>
        </CardContentStyle>

        <CardActions sx={{ p: 0 }}>
          <TourCardActions
            variant={variant}
            tourId={id}
            title={title}
            bookingId={bookingId}
            operatorId={operator.id}
            isAvailable={isAvailable}
          />
        </CardActions>
      </ContentWrapper>
    </CardWrapper>
  );
};
