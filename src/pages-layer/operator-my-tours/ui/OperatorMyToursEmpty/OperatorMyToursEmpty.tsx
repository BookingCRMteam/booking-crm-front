import Image from 'next/image';
import Link from 'next/link';

import { Box, Button, Typography } from '@mui/material';

import { APP_ROUTE } from '@/shared/constants';

export const OperatorMyToursEmpty = () => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        src="/images/my_tours_empty.png"
        width={332}
        height={282}
        alt="Малюнок трейлеру та шезлонгу"
      />
      <Typography
        component="p"
        align="center"
        variant="bodyLarge"
        sx={{ mb: 5 }}
      >
        У вас ще немає створених турів.
        <br />
        Додайте тур, щоб залучати нових клієнтів.
      </Typography>

      <Button
        component={Link}
        href={APP_ROUTE.OPERATOR_TOURS_CREATE}
        color="primary"
        variant="contained"
        sx={{ width: '200px' }}
      >
        Додати тур
      </Button>
    </Box>
  );
};
