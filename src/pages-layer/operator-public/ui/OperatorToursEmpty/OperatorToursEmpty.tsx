import Image from 'next/image';
import Link from 'next/link';

import { Box, Button, Typography } from '@mui/material';

import { APP_ROUTE } from '@/shared/constants';

export const OperatorToursEmpty = () => {
  return (
    <Box
      sx={{
        paddingTop: '40px',
        paddingBottom: '60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
      }}
    >
      <Image
        src="/images/operator_tours_empty.png"
        width={520}
        height={203}
        alt="Малюнки різних природніх краєвидів."
      />
      <Typography component="p" align="center" variant="bodyLarge">
        Туроператор зараз працює над новими маршрутами — обіцяємо, воно того
        варте!
      </Typography>
      <Link href={APP_ROUTE.CATALOG}>
        <Button color="primary" variant="contained">
          До каталогу
        </Button>
      </Link>
    </Box>
  );
};
