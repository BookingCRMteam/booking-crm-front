import { Box, Button, Typography } from '@mui/material';

import { AUTH_URL } from '@/shared/constants/auth';
import { APP_ROUTE } from '@/shared/constants/routes';

export const FooterOperatorColumn = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <Typography variant="priceHighlight" component="h3">
        Організаторам подорожей
      </Typography>

      <Typography component="p" variant="bodyDefault">
        Втомилися від хаосу в Діректі та ручних оплат? Наша платформа візьме на
        себе рутину, щоб ви могли сфокусуватись на створенні вражень.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        component="a"
        size="large"
        href={`${AUTH_URL.LOGIN}?returnTo=${APP_ROUTE.AUTH_REDIRECT_OPERATOR}`}
      >
        Стати партнером
      </Button>
    </Box>
  );
};
