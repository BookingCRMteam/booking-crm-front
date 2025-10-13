import React from 'react';

import { Box, Button, Popover, Typography, styled } from '@mui/material';

import { CloseButton } from '@/shared/ui/CloseButton';

type BookingAuthPopoverProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onAuth: () => void;
};

export const BookingAuthPopover = ({
  open,
  anchorEl,
  onClose,
  onAuth,
}: BookingAuthPopoverProps) => {
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

  return (
    <>
      <Popover
        open={open}
        onClose={onClose}
        elevation={0}
        anchorEl={anchorEl}
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
            sx: (theme) => ({
              backgroundColor: `${theme.palette.neutral.darkGray}80`,
            }),
          },
        }}
      >
        <PopoverContent>
          <CloseButton onClick={onClose} />
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
              onClick={onClose}
            >
              Відмінити
            </Button>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={onAuth}
            >
              Вхід/Реєстрація
            </Button>
          </ActionButtons>
        </PopoverContent>
      </Popover>
    </>
  );
};
