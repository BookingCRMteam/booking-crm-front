import Image from 'next/image';
import NextLink from 'next/link';

import { Link as MuiLink } from '@mui/material';
import { Box, Button, Typography } from '@mui/material';

import { APP_ROUTE } from '@/shared/constants';

const componentWrapper = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  alignItems: 'center',
  justifyContent: 'center',
  gap: { xs: 5, md: '70px' },
  paddingY: { xs: 5, md: 0 },
};

const imageWrapper = {
  width: '100%',
  maxWidth: '331px',
  height: 'auto',
};

const contentWrapper = {
  maxWidth: '508px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: { xs: 'center', md: 'start' },
  textAlign: { xs: 'center', md: 'start' },
  gap: '36px',
};

export const OperatorNoVerified = () => {
  return (
    <Box sx={componentWrapper}>
      <Box sx={imageWrapper}>
        <Image
          src="/images/my_tours_no_verified.png"
          alt="Малюнок годиннику в очікуванні верифікації"
          width={371}
          height={375}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />
      </Box>
      <Box sx={contentWrapper}>
        <Typography variant="h3">
          Створення турів тимчасово недоступне
        </Typography>
        <Box>
          <Typography component="p" variant="bodyLarge" sx={{ mb: '20px' }}>
            Після підтвердження вашого статусу ви зможете додавати свої
            авторські мандрівки.
          </Typography>
          <Typography component="p" variant="bodyLarge">
            А поки — доповніть профіль або надихніться турами інших у{' '}
            <MuiLink
              component={NextLink}
              href={APP_ROUTE.CATALOG}
              sx={(theme) => ({
                color: theme.palette.info.main,
                '&:hover': {
                  color: theme.palette.info.dark,
                },
              })}
            >
              Каталозі турів
            </MuiLink>
          </Typography>
        </Box>
        <Button
          component={NextLink}
          href={APP_ROUTE.OPERATOR}
          color="primary"
          variant="contained"
          size="large"
        >
          Заповнити Мій профіль
        </Button>
      </Box>
    </Box>
  );
};
