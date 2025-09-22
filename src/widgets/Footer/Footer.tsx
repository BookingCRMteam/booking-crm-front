import { Box, Button, Typography } from '@mui/material';

import { AUTH_URL } from '@/shared/constants/auth';
import { APP_ROUTE } from '@/shared/constants/routes';

export const Footer = () => {
  return (
    <Box
      sx={{
        maxwidth: '100%',
        background: '#272727',
        padding: 5,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4.5,
          width: '30%',
        }}
      >
        <Typography component="p" variant="body1">
          Ви створюєте унікальні подорожі? Ми візьмемо на себе всю вашу
          операційну рутину
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component="a"
          href={`${AUTH_URL.LOGIN}?returnTo=${APP_ROUTE.AUTH_REDIRECT_OPERATOR}`}
        >
          Стати партнером
        </Button>
      </Box>
    </Box>
  );
};
