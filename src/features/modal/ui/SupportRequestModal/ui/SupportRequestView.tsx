'use client';

import type { FC } from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';

import {
  SUPPORT_REQUEST_MODAL_BUTTON_TEXT,
  SUPPORT_REQUEST_MODAL_DESCRIPTION,
  SUPPORT_REQUEST_MODAL_PLACEHOLDER,
} from './constants';

type SupportRequestViewProps = {
  onSendRequest: () => void;
};

export const SupportRequestView: FC<SupportRequestViewProps> = ({
  onSendRequest,
}) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          width: '100%',
        }}
      >
        <Typography component="p" variant="bodyLarge">
          {SUPPORT_REQUEST_MODAL_DESCRIPTION}
        </Typography>
        <TextField
          label={SUPPORT_REQUEST_MODAL_PLACEHOLDER}
          placeholder={SUPPORT_REQUEST_MODAL_PLACEHOLDER}
          fullWidth
          variant="outlined"
          multiline
          minRows={2.5}
        />
      </Box>
      <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={onSendRequest}
        sx={{ width: 'fit-content', margin: '0 auto' }}
      >
        {SUPPORT_REQUEST_MODAL_BUTTON_TEXT}
      </Button>
    </>
  );
};
