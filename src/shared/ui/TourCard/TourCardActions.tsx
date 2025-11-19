'use client';

import type { FC } from 'react';

import Link from 'next/link';

import { Box, Button } from '@mui/material';

import { APP_ROUTE } from '@/shared/constants';

import { BookingButton } from './BookingButton';
import type { TourCardVariantType } from './types';

type TourCardActionsProps = {
  variant: TourCardVariantType;
  id: number;
  isAvailable: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

export const TourCardActions: FC<TourCardActionsProps> = ({
  variant,
  id,
  isAvailable,
  onEdit,
  onDelete,
}) => {
  if (variant === 'catalog') {
    return (
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
        href={`${APP_ROUTE.CATALOG}${APP_ROUTE.TOUR}/${id}`}
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
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        onClick={onEdit}
      >
        Редагувати
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        size="large"
        fullWidth
        onClick={onDelete}
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
  );
};
