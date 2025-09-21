import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { Box, Button } from '@mui/material';

import { APP_ROUTE, AUTH_URL } from '@/shared/constants';

export const UnauthorizedMenu = () => (
  <Box sx={{ display: 'flex', gap: 2 }}>
    <Button
      variant="outlined"
      color="inherit"
      component="a"
      startIcon={<PeopleAltOutlinedIcon />}
      href={`${AUTH_URL.LOGIN}?returnTo=${APP_ROUTE.AUTH_REDIRECT}`}
    >
      Вхід
    </Button>
  </Box>
);
