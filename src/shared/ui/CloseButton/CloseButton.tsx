import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

interface CloseButtonProps {
  onClick: () => void;
  top?: number;
  right?: number;
}

export const CloseButton = ({
  onClick,
  top = 8,
  right = 8,
}: CloseButtonProps) => {
  return (
    <IconButton
      size="small"
      onClick={onClick}
      sx={{
        position: 'absolute',
        top,
        right,
      }}
    >
      <CloseIcon />
    </IconButton>
  );
};
