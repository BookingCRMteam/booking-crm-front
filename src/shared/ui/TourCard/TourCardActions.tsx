'use client';

import { type FC, useState } from 'react';

import Link from 'next/link';

import { Box, Button } from '@mui/material';

import { DeleteTourModal } from '@/pages-layer/operator-my-tours';

import { useDeleteTour } from '@/entities/tour/model/useDeleteTour';

import { APP_ROUTE, DYNAMIC_ROUTE } from '@/shared/constants';
import { logger } from '@/shared/lib/logger';

import { BookingButton } from './BookingButton';
import type { TourCardVariantType } from './types';

type TourCardActionsProps = {
  variant: TourCardVariantType;
  operatorId: number;
  tourId: number;
  title: string;
  isAvailable: boolean;
};

export const TourCardActions: FC<TourCardActionsProps> = ({
  variant,
  operatorId,
  tourId,
  title,
  isAvailable,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const deleteTour = useDeleteTour(operatorId);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteTour.mutate(tourId, {
      onSuccess: () => {
        logger.info('Тур видалено!');
        setIsDeleteModalOpen(false);
      },
      onError: (error) => {
        logger.error('Помилка при видаленні туру', error);
        setIsDeleteModalOpen(false);
      },
    });
  };

  const handleCloseModal = () => {
    if (!deleteTour.isPending) {
      setIsDeleteModalOpen(false);
    }
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
    <>
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
          onClick={handleDeleteClick}
          disabled={deleteTour.isPending}
          sx={(theme) => ({
            color: theme.palette.common.white,
            '&:hover, &:focus-visible, &:active': {
              color: theme.palette.primaryExtended[950],
            },
          })}
        >
          Видалити
        </Button>
      </Box>

      <DeleteTourModal
        title={title}
        open={isDeleteModalOpen}
        isLoading={deleteTour.isPending}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};
