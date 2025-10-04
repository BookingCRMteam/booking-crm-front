'use client';

import type { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  type Theme,
  Typography,
} from '@mui/material';

import type { TourPhoto } from '@/entities/tour/model/types';

import { APP_ROUTE } from '@/shared/constants';
import { CalendarIcon, MapPinIcon } from '@/shared/icons';
import { formattedDate } from '@/shared/utils';

import Label from './Label';
import { TourCardImage } from './TourCardImage';
import { TourOperatorDisplay } from './TourOperatorDisplay';

// const DEFAULT_IMAGE_URL = '/images/tourCard/tour.png';
const DEFAULT_OPERATOR_IMAGE_URL = '/images/tourCard/operator.png';

interface TourCardProps {
  id: number;
  title: string;
  availableSpots: number;
  price: string;
  photos: TourPhoto[];
  startDate: string;
  endDate: string;
  countryName: string; // Будемо передавати вже витягнуту назву країни
  operator: {
    firstName: string;
    lastName: string;
    photo: string | null;
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
  const date = `${formattedDate(startDate)} - ${formattedDate(endDate)}`;
  const mainPhoto = photos.find((photo) => photo.isMain === true) ?? photos[0];

  const dynamicStyles = (theme: Theme) => ({
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
  });

  return (
    <Card sx={dynamicStyles}>
      <Box
        className="tour-card-image-wrapper"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          overflow: 'hidden',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <TourCardImage mainPhoto={mainPhoto} title={title} />
      </Box>
      <Label count={availableSpots} />
      <Box
        className="tour-card-content-wrapper"
        sx={{
          zIndex: 1,
          backgroundColor: 'rgba(54, 54, 54, 0.4)',
          padding: '12px 8px 28px',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          backdropFilter: 'blur(10px)',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            color: (theme) => theme.palette.common.white,
            p: 0,
          }}
        >
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
                <CalendarIcon fontSize="medium" color="inherit" />
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
                <MapPinIcon fontSize="medium" color="inherit" />
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
            <Divider
              component="hr"
              variant="fullWidth"
              sx={{
                width: '100%',
                m: '12px 0 7.3px',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 1,
                gap: 1,
              }}
            >
              <Image
                src={operator.photo ?? DEFAULT_OPERATOR_IMAGE_URL}
                width={32}
                height={32}
                alt="avatar for operator"
              />
              <TourOperatorDisplay
                operator={`${operator.firstName} ${operator.lastName}`}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Typography variant="priceHighlight" component="p">
              &#x20B4;
            </Typography>
            <Typography variant="priceHighlight" component="p">
              {price}
            </Typography>
            <Typography variant="priceHighlight" component="p">
              (за двох)
            </Typography>
          </Box>
        </CardContent>

        <CardActions sx={{ p: 0 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            component={Link}
            href={`${APP_ROUTE.TOUR}/${id}`}
            disabled={!isAvailable}
          >
            Детальніше
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};
