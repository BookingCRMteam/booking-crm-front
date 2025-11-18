'use client';

import { Box, Button, TextField, Typography } from '@mui/material';

import { useModalStore } from '@/features/modal/model/useModalStore';

import { ModalWrapper } from '../../ModalWrapper';
import {
  SUPPORT_REQUEST_MODAL_BUTTON_TEXT,
  SUPPORT_REQUEST_MODAL_DESCRIPTION,
  SUPPORT_REQUEST_MODAL_PLACEHOLDER,
  SUPPORT_REQUEST_MODAL_TITLE,
} from './constants';

export const SupportRequestModal = () => {
  const close = useModalStore((s) => s.closeModal);

  const handleRedirectToOnboarding = () => {
    console.log('Submit support request');
    close();
  };
  return (
    <ModalWrapper title={SUPPORT_REQUEST_MODAL_TITLE}>
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
        onClick={handleRedirectToOnboarding}
        sx={{ width: 'fit-content', margin: '0 auto' }}
      >
        {SUPPORT_REQUEST_MODAL_BUTTON_TEXT}
      </Button>
    </ModalWrapper>
  );
};
