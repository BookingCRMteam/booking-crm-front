'use client';

import type { FC } from 'react';

import Link from 'next/link';

import { Box, Button } from '@mui/material';

import { useDeleteTour } from '@/entities/tour/model/useDeleteTour';

import { APP_ROUTE, DYNAMIC_ROUTE } from '@/shared/constants';
import { logger } from '@/shared/lib/logger';

import { BookingButton } from './BookingButton';
import type { TourCardVariantType } from './types';

type TourCardActionsProps = {
  variant: TourCardVariantType;
  operatorId: number;
  tourId: number;
  isAvailable: boolean;
};

export const TourCardActions: FC<TourCardActionsProps> = ({
  variant,
  operatorId,
  tourId,
  isAvailable,
}) => {
  const deleteTour = useDeleteTour(operatorId);

  const handleDeleteTour = () => {
    deleteTour.mutate(tourId, {
      onSuccess: () => logger.info('Тур видалено!'),
      onError: (error) => logger.error('Помилка при видаленні туру', error),
    });
  };

  if (variant === 'catalog') {
    return (
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        component={Link}
        href={`${APP_ROUTE.CATALOG}${APP_ROUTE.TOUR}/${tourId}`}
        disabled={!isAvailable}
      >
        Детальніше
      </Button>
    );
  }

  if (variant === 'couple-booking') {
    return (
      <BookingButton
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        component={Link}
        href={`${APP_ROUTE.CATALOG}${APP_ROUTE.TOUR}/${tourId}`}
      >
        Заброньовано
      </BookingButton>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
      }}
    >
      <Link href={DYNAMIC_ROUTE.OPERATOR_TOURS_EDIT(tourId)}>
        <Button variant="contained" color="primary" size="large" fullWidth>
          Редагувати
        </Button>
      </Link>

      <Button
        variant="outlined"
        color="secondary"
        size="large"
        fullWidth
        onClick={handleDeleteTour}
        disabled={deleteTour.isPending}
        sx={(theme) => ({
          color: theme.palette.common.white,
          '&:hover, &:focus-visible, &:active': {
            color: theme.palette.primaryExtended[950],
          },
        })}
      >
        {deleteTour.isPending ? 'Видалення...' : 'Видалити'}
      </Button>
    </Box>
  );
};
