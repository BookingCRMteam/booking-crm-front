import React from 'react';

import { Typography } from '@mui/material';

type TooltipForFieldProps = {
  text: string;
};

export const TooltipForField = ({ text }: TooltipForFieldProps) => {
  return (
    <Typography
      sx={{
        width: '240px',
        minHeight: '56px',
        height: 'fit-content',
        border: '0.5px solid lightgray',
        borderRadius: '4px',
        p: 1,
        fontSize: '12px',
        whiteSpace: 'pre-line',
      }}
    >
      {text}
    </Typography>
  );
};
