'use client';

import { useRouter } from 'next/navigation';

import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';

import { useModalStore } from '@/features/modal/model/useModalStore';

import { APP_ROUTE } from '@/shared/constants';

export type OperatorVerificationRejectedProps = {
  message: string;
};

export const OperatorVerificationRejected = ({
  message,
}: OperatorVerificationRejectedProps) => {
  const close = useModalStore((s) => s.closeModal);
  const router = useRouter();
  const handleRedirectToOnboarding = () => {
    close();
    router.push(APP_ROUTE.OPERATOR_ONBOARDING);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        maxWidth: 622,
        width: '100%',
        margin: '0 auto',
        p: 8,
        border: '1px solid #ccc',
        borderRadius: 1,
        position: 'relative',
      }}
    >
      <IconButton
        aria-label="close"
        onClick={close}
        sx={{
          position: 'absolute',
          top: '20px',
          right: '20px',
        }}
      >
        <CloseIcon />
      </IconButton>
      <Typography component="h3" variant="h4">
        Вашу заявку відхилено!
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          maxWidth: 306,
          width: '100%',
        }}
      >
        <Typography component="p" variant="body2">
          Ваш статус “Туроператор” не підтверджено.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography component="p" variant="body2">
            Причина:
          </Typography>
          <Typography
            component="p"
            variant="body2"
            sx={{
              padding: 2,
              border: '1px solid black',
            }}
          >
            {message}
          </Typography>
        </Box>
        <Button
          color="info"
          variant="contained"
          onClick={handleRedirectToOnboarding}
        >
          Подати нові дані
        </Button>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography component="p" variant="body2">
            Є питання?
          </Typography>
          <Typography
            component="p"
            variant="body2"
            color="info"
            sx={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}
          >
            Звернутись до тех підтримки
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
