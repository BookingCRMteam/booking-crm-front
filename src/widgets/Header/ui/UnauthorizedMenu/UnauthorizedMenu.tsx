import { Box, Button } from '@mui/material';
import { UsersIcon } from '@phosphor-icons/react';

import { APP_ROUTE, AUTH_URL } from '@/shared/constants';

export const UnauthorizedMenu = () => (
  <Box sx={{ display: 'flex', gap: 2 }}>
    <Button
      variant="outlined"
      color="primary"
      size="large"
      component="a"
      startIcon={<UsersIcon size={24} />}
      href={`${AUTH_URL.LOGIN}?returnTo=${APP_ROUTE.AUTH_REDIRECT}`}
    >
      Вхід
    </Button>
  </Box>
);
