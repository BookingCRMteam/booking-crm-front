'use client';

import type { FC } from 'react';

import Link from 'next/link';

import { Box, Button } from '@mui/material';

import { useDeleteTour } from '@/entities/tour/model/useDeleteTour';

import { APP_ROUTE, DYNAMIC_ROUTE } from '@/shared/constants';
import { logger } from '@/shared/lib/logger';

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
    if (!window.confirm('Ви впевнені, що хочете видалити цей тур?')) {
      return;
    }

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
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
      }}
    >
      <Button
        component={Link}
        href={DYNAMIC_ROUTE.OPERATOR_TOURS_EDIT(tourId)}
        variant="contained"
        color="primary"
        size="large"
        fullWidth
      >
        Редагувати
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        size="large"
        fullWidth
        aria-busy={deleteTour.isPending}
        aria-live="polite"
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
