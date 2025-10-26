import { type MouseEvent } from 'react';

import { useRouter } from 'next/navigation';

import { Box, Button, Popover, Typography, styled } from '@mui/material';

import { APP_ROUTE } from '@/shared/constants';
import { useBookingStore } from '@/shared/store';
import { CloseButton } from '@/shared/ui';

type BookingOperatorPopoverProps = {
  forceOpen?: boolean;
  anchorEl: HTMLElement | null;
};

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

export const BookingOperatorPopover = ({
  forceOpen = false,
  anchorEl,
}: BookingOperatorPopoverProps) => {
  const { isOperatorPopoverOpen, closeOperatorPopover, startRedirect } =
    useBookingStore();

  const router = useRouter();

  const open = forceOpen || isOperatorPopoverOpen;

  const handleCreateTour = (e: MouseEvent<HTMLButtonElement>) => {
    if (forceOpen) return e.preventDefault();

    closeOperatorPopover();
    startRedirect();
    router.push(APP_ROUTE.OPERATOR);
  };

  const handleClose = () => {
    if (!forceOpen) {
      closeOperatorPopover();
    }
  };

  return (
    <Popover
      aria-labelledby="operator-popover-desc"
      role="dialog"
      open={open}
      onClose={handleClose}
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
        root: {
          slotProps: {
            backdrop: {
              sx: (theme) => ({
                backgroundColor: `${theme.palette.neutral.darkGray}80`,
              }),
            },
          },
        },
      }}
    >
      <PopoverContent>
        <CloseButton onClick={handleClose} />
        <Typography
          id="operator-popover-desc"
          align="center"
          variant="bodyLarge"
          component="p"
          maxWidth={339}
          color="error"
        >
          Ви, як авторизований туроператор, можете лише переглядати існуючі тури
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
            fullWidth
            onClick={handleCreateTour}
          >
            Створити власний тур
          </Button>
        </ActionButtons>
      </PopoverContent>
    </Popover>
  );
};
