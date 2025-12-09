'use client';

import type { FC } from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';

import {
  MODAL_VERIFICATION_REJECTED_BUTTON_TEXT,
  MODAL_VERIFICATION_REJECTED_DESCRIPTION,
  MODAL_VERIFICATION_REJECTED_REASON_LABEL,
} from './constants';

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
        <TextField
          value={message}
          disabled
          multiline
          minRows={2.5}
          fullWidth
          variant="outlined"
        />
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
