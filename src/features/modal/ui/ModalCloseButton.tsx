'use client';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

import { useModalStore } from '../model/useModalStore';

export const ModalCloseButton = () => {
  const handleClose = useModalStore((s) => s.closeModal);
  return (
    <IconButton
      aria-label="close modal"
      onClick={handleClose}
      sx={{
        position: 'absolute',
        top: '12px',
        right: '12px',
      }}
    >
      <CloseIcon />
    </IconButton>
  );
};
