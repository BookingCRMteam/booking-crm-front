'use client';

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

import { Tour } from '@/entities/tour/model/types';

import { CalendarIcon, MapPinIcon } from '@/shared/icons';

import Label from './Label';

export interface TourCardType {
  tour: Tour;
}

export const TourCard: React.FC<TourCardType> = ({
  tour: {
    id,
    title,
    availableSpots,
    operator,
    price,
    photos,
    startDate,
    endDate,
    countryISO2Code,
  },
}) => {
  const isAvailable = availableSpots !== 0;
  const date = `${startDate} - ${endDate}`;
  const mainPhoto = photos.find((photo) => photo.isMain === true);
  const dynamicStyles = (theme: Theme) => ({
    width: 331,
    minHeight: 600,
    position: 'relative',
    borderRadius: '4px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    border: '3px solid transparent',
    transition: 'border 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    boxShadow: 'none',

    ...(isAvailable && {
      '&:has(.MuiButton-root:focus)': {
        border: `3px solid ${theme.palette.primary.dark}`,
      },

      '&:has(.MuiButton-root:active)': {
        border: `3px solid ${theme.palette.primary.light}`,
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
        <Image
          src={mainPhoto?.url ?? '/images/tourCard/tour.png'}
          alt={mainPhoto?.description ?? title}
          fill
          sizes="(max-width: 768px) 100vw, 331px"
          style={{
            objectFit: 'cover',
          }}
        />
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
            color: '#fff',
            p: 0,
          }}
        >
          <Typography gutterBottom align="center" variant="h3" component="h4">
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
                <Typography variant="bodyDefault">{date}</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <MapPinIcon fontSize="medium" color="inherit" />
                <Typography variant="bodyDefault">{countryISO2Code}</Typography>
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
                src={operator.photo ?? '/images/tourCard/operator.png'}
                width={32}
                height={32}
                alt="avatar for operator"
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1,
                }}
              >
                <Typography variant="bodyDefault" component="p">
                  Туроператор:
                </Typography>
                <Typography
                  variant="bodySmall"
                  component="p"
                  sx={{
                    pt: '3px',
                  }}
                >
                  {`${operator.firstName} ${operator.lastName}`}
                </Typography>
              </Box>
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
            href={`/tour/${id}`}
            disabled={!isAvailable}
          >
            Детальніше
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};
