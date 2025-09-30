import Image from 'next/image';
import Link from 'next/link';

import { Box, Button, Typography } from '@mui/material';

import { APP_ROUTE } from '@/shared/constants';

export const CatalogEmpty = () => {
  return (
    <Box
      sx={{
        paddingTop: '120px',
        paddingBottom: '215px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Image
        src="/images/catalog_empty.png"
        width={334}
        height={181}
        alt="Пара туристів сидить, обійнявшись, в очікуванні нових турів."
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          alignItems: 'center',
          maxWidth: '506px',
        }}
      >
        <Typography component="p" align="center" variant="bodyLarge">
          Ой, зараз тут тихо… Але зовсім скоро з’являться нові мандрівки, які
          закохають у себе
        </Typography>
        <Button
          component={Link}
          href={APP_ROUTE.HOME}
          color="primary"
          variant="contained"
        >
          На головну
        </Button>
      </Box>
    </Box>
  );
};
