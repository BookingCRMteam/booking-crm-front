import React from 'react';

import { Box, Typography, useTheme } from '@mui/material';
import { CertificateIcon } from '@phosphor-icons/react';

export const VerifiedBadge = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '153px',
        height: '28px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.5,
        borderRadius: 1,
        border: `2px solid ${theme.palette.primaryExtended[700]}`,
        backgroundColor: theme.palette.accent[3],
      }}
    >
      <CertificateIcon size={24} />
      <Typography
        component="span"
        sx={(theme) => ({
          ...theme.typography.bodyDefault,
        })}
      >
        Верифіковано
      </Typography>
    </Box>
  );
};
