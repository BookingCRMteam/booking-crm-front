'use client';

import { type FC, useRef } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  IconButton,
  Popover,
  Typography,
  styled,
} from '@mui/material';

import { useBookingAuthModal } from '../lib/useBookingAuthModal';

interface BookingButtonProps {
  isAvailable?: boolean;
}

const PopoverContent = styled(Box)({
  padding: '36px 24px',
  minWidth: 280,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
});

const ActionButtons = styled(Box)({
  display: 'flex',
  gap: '15px',
});

export const BookingButton: FC<BookingButtonProps> = ({
  isAvailable = false,
}) => {
  const { isModalOpen, handleOpen, handleAuth, handleClose } =
    useBookingAuthModal();

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        ref={buttonRef}
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        disabled={!isAvailable}
        onClick={handleOpen}
        sx={{ '&.Mui-disabled': { color: 'common.white' } }}
      >
        Забронювати
      </Button>
      <Popover
        open={isModalOpen}
        onClose={handleClose}
        elevation={0}
        anchorEl={buttonRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        slotProps={{
          backdrop: {
            sx: { backgroundColor: 'rgba(84, 84, 84, 0.5)' },
          },
        }}
      >
        <PopoverContent>
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            align="center"
            variant="bodyLarge"
            component="p"
            maxWidth={339}
          >
            Щоб забронювати цей тур, будь ласка, увійдіть в свій акаунт/
            зареєструйтесь
          </Typography>
          <ActionButtons>
            <Button
              variant="outlined"
              size="large"
              color="secondary"
              onClick={handleClose}
            >
              Відмінити
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleAuth}
            >
              Вхід/Реєстрація
            </Button>
          </ActionButtons>
        </PopoverContent>
      </Popover>
    </>
  );
};
