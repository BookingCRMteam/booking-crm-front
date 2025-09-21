import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';

import { useModalStore } from '@/features/modal/model/useModalStore';

export const OperatorVerificationPending = () => {
  const close = useModalStore((s) => s.closeModal);
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
        Дякуємо!
      </Typography>
      <Typography component="p" variant="body2" sx={{ textAlign: 'center' }}>
        Вашу заявку на статус “Туроператор” отримано. Очікуйте, будь ласка,
        підтвердження вашої веріфікації на протязі доби
      </Typography>
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
  );
};
