import { useCallback } from 'react';
import type { MouseEvent } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { Box, Button, Popover, Typography, styled } from '@mui/material';

import { AUTH_URL } from '@/shared/constants';
import { useBookingStore } from '@/shared/store';
import { CloseButton } from '@/shared/ui';

type BookingAuthPopoverProps = {
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

export const BookingAuthPopover = ({
  forceOpen = false,
  anchorEl,
}: BookingAuthPopoverProps) => {
  const { isAuthPopoverOpen, closeAuthPopover } = useBookingStore();

  const open = forceOpen || isAuthPopoverOpen;

  const router = useRouter();
  const currentPath = usePathname();

  const handleAuth = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (forceOpen) return e.preventDefault();

      closeAuthPopover();
      router.push(
        `${AUTH_URL.LOGIN}?returnTo=${encodeURIComponent(currentPath)}`,
      );
    },
    [router, currentPath, forceOpen, closeAuthPopover],
  );

  return (
    <Popover
      aria-labelledby="auth-popover-desc"
      role="dialog"
      open={open}
      onClose={closeAuthPopover}
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
        <CloseButton onClick={closeAuthPopover} />
        <Typography
          id="auth-popover-desc"
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
            onClick={closeAuthPopover}
          >
            Відмінити
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={handleAuth}
          >
            Вхід/Реєстрація
          </Button>
        </ActionButtons>
      </PopoverContent>
    </Popover>
  );
};
