import { Box, Button } from '@mui/material';

import { APP_ROUTE, AUTH_URL } from '@/shared/constants';
import { LoginIcon } from '@/shared/icons';

export const UnauthorizedMenu = () => (
  <Box sx={{ display: 'flex', gap: 2 }}>
    <Button
      variant="outlined"
      color="primary"
      size="large"
      component="a"
      startIcon={<LoginIcon color="inherit" fontSize="medium" />}
      href={`${AUTH_URL.LOGIN}?returnTo=${APP_ROUTE.AUTH_REDIRECT}`}
    >
      Вхід
    </Button>
  </Box>
);
