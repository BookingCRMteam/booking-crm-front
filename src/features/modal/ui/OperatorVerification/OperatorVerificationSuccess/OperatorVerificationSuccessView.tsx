'use client';

import type { FC } from 'react';

import { Button, Typography } from '@mui/material';

import {
  MODAL_VERIFICATION_SUCCESS_BUTTON_TEXT,
  MODAL_VERIFICATION_SUCCESS_DESCRIPTION,
} from './constants';

type OperatorVerificationSuccessViewProps = {
  onRedirect: () => void;
};

export const OperatorVerificationSuccessView: FC<
  OperatorVerificationSuccessViewProps
> = ({ onRedirect }) => {
  return (
    <>
      <Typography
        component="p"
        variant="bodyLarge"
        sx={{ textAlign: 'center', maxWidth: '370px' }}
      >
        {MODAL_VERIFICATION_SUCCESS_DESCRIPTION}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={onRedirect}
        sx={{ width: 'fit-content' }}
      >
        {MODAL_VERIFICATION_SUCCESS_BUTTON_TEXT}
      </Button>
    </>
  );
};
