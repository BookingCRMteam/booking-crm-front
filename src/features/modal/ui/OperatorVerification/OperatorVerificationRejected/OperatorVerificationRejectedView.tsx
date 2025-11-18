'use client';

import { FC } from 'react';

import {
  Box,
  Button,
  Typography,
  type TypographyProps,
  styled,
} from '@mui/material';

import {
  MODAL_VERIFICATION_REJECTED_BUTTON_TEXT,
  MODAL_VERIFICATION_REJECTED_DESCRIPTION,
  MODAL_VERIFICATION_REJECTED_PLACEHOLDER_TEXT,
  MODAL_VERIFICATION_REJECTED_REASON_LABEL,
} from '../constants';

const ErrorMessage = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: '16px',
  padding: '6px 16px',
  borderRadius: '4px',
  width: '100%',
  maxWidth: '408px',
  border: `1px solid ${theme.palette.common.black}`,
  color: theme.palette.gray[800],
}));

type OperatorVerificationRejectedViewProps = {
  message: string;
  onRedirect: () => void;
};

export const OperatorVerificationRejectedView: FC<
  OperatorVerificationRejectedViewProps
> = ({ message, onRedirect }) => {
  return (
    <>
      <Typography
        component="p"
        variant="bodyLarge"
        sx={{ alignSelf: 'flex-start' }}
      >
        {MODAL_VERIFICATION_REJECTED_DESCRIPTION}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          width: '100%',
        }}
      >
        <Typography component="p" variant="bodyDefault">
          {MODAL_VERIFICATION_REJECTED_REASON_LABEL}
        </Typography>
        <ErrorMessage component="p" variant="inputPlaceholder">
          {message || MODAL_VERIFICATION_REJECTED_PLACEHOLDER_TEXT}
        </ErrorMessage>
      </Box>
      <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={onRedirect}
        sx={{ width: 'fit-content', margin: '0 auto' }}
      >
        {MODAL_VERIFICATION_REJECTED_BUTTON_TEXT}
      </Button>
    </>
  );
};
