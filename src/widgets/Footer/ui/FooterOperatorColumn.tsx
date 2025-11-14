'use client';

import { Box, Button, Typography } from '@mui/material';

import { useUserQuery } from '@/entities/user';

import { AUTH_URL } from '@/shared/constants/auth';
import { APP_ROUTE } from '@/shared/constants/routes';

import {
  FOOTER_OPERATOR_BUTTON,
  FOOTER_OPERATOR_DESCRIPTION,
  FOOTER_OPERATOR_TITLE,
} from './constants';

export const FooterOperatorColumn = () => {
  const { data: user } = useUserQuery();
  const isOperator = user?.role === 'operator';
  const operatorLink = !user
    ? `${AUTH_URL.LOGIN}?returnTo=${APP_ROUTE.AUTH_REDIRECT_OPERATOR}`
    : isOperator
      ? APP_ROUTE.OPERATOR
      : APP_ROUTE.OPERATOR_ONBOARDING;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <Typography variant="priceHighlight" component="h3">
        {FOOTER_OPERATOR_TITLE}
      </Typography>

      <Typography component="p" variant="bodyDefault">
        {FOOTER_OPERATOR_DESCRIPTION}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        component="a"
        size="large"
        href={operatorLink}
      >
        {FOOTER_OPERATOR_BUTTON}
      </Button>
    </Box>
  );
};
