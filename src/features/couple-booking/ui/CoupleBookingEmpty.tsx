import Link from 'next/link';

import { Box, Button, Typography } from '@mui/material';

import { APP_ROUTE } from '@/shared/constants';

export const CoupleBookingEmpty = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        alignItems: 'center',
        gap: '24px',
        justifyContent: 'center',
        maxWidth: '475px',
      }}
    >
      <Typography variant="bodyLarge">
        У вас ще немає активних бронювань. Час це виправити!
      </Typography>
      <Button
        LinkComponent={Link}
        href={APP_ROUTE.CATALOG}
        variant="contained"
        color="primary"
        size="large"
        sx={{ maxWidth: 200, width: '100%', placeSelf: 'center' }}
      >
        До каталогу
      </Button>
    </Box>
  );
};
