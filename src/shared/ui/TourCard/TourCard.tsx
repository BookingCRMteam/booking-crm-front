'use client';

import type { FC } from 'react';

import Link from 'next/link';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardProps,
  Typography,
  styled,
} from '@mui/material';
import { CalendarDotsIcon, MapPinLineIcon } from '@phosphor-icons/react';

import type { TourPhoto } from '@/entities/tour/model/types';

import { APP_ROUTE } from '@/shared/constants';
import { OperatorLink } from '@/shared/ui';
import { formattedDate } from '@/shared/utils';

import Label from './Label';
import { TourCardImage } from './TourCardImage';

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
    '&:has(.MuiButton-root:focus)': {
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
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
  overflow: 'hidden',
  transition: 'transform 0.3s ease-in-out',
});

const PriceWrapper = styled(Box)({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
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
interface TourCardProps {
  id: number;
  title: string;
  availableSpots: number;
  price: string;
  photos: TourPhoto[];
  startDate: string;
  endDate: string;
  countryName: string;
  operator: {
    name: string;
    photo: string | null;
    id: number;
  };
}

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
}) => {
  const isAvailable = availableSpots !== 0;
  const date = `${formattedDate(startDate)} — ${formattedDate(endDate)}`;
  const mainPhoto = photos.find((photo) => photo.isMain === true) ?? photos[0];

  return (
    <CardWrapper isAvailable={isAvailable}>
      <ImageWrapper className="tour-card-image-wrapper">
        <TourCardImage mainPhoto={mainPhoto} title={title} />
      </ImageWrapper>
      <Label count={availableSpots} />
      <ContentWrapper className="tour-card-content-wrapper">
        <CardContentStyle>
          <Typography
            align="center"
            variant="h3"
            component="h4"
            sx={{
              '&::first-letter': {
                textTransform: 'uppercase',
              },
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              p: '0 8px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 1,
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <CalendarDotsIcon size={24} />
                <Typography
                  variant="bodyDefault"
                  sx={{
                    lineHeight: '1',
                    transform: 'translateY(1.2px)',
                  }}
                >
                  {date}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <MapPinLineIcon size={24} />
                <Typography
                  variant="bodyDefault"
                  sx={{
                    fontFamily: 'Inter',
                    lineHeight: '1',
                    transform: 'translateY(1px)',
                    letterSpacing: '0.04em',
                  }}
                  component="p"
                >
                  {countryName}
                </Typography>
              </Box>
            </Box>
            <OperatorLink
              variant="card"
              id={operator.id}
              name={operator.name}
              photo={operator.photo}
            />
          </Box>
          <PriceWrapper>
            <Typography variant="priceHighlight" component="p">
              &#x20B4;
            </Typography>
            <Typography variant="priceHighlight" component="p">
              {price}
            </Typography>
            <Typography variant="priceHighlight" component="p">
              (за двох)
            </Typography>
          </PriceWrapper>
        </CardContentStyle>

        <CardActions sx={{ p: 0 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            component={Link}
            href={`${APP_ROUTE.CATALOG}${APP_ROUTE.TOUR}/${id}`}
            disabled={!isAvailable}
          >
            Детальніше
          </Button>
        </CardActions>
      </ContentWrapper>
    </CardWrapper>
  );
};
