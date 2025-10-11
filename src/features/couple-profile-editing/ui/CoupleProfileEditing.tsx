'use client';

import { useState } from 'react';

import { Box, Typography } from '@mui/material';

import { CoupleProfileForm } from './CoupleProfileForm';
import { CoupleProfileView } from './CoupleProfileView';

export const CoupleProfileEditing = () => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        pt: 10,
      }}
    >
      <Typography align="center" variant="h1" component="h1">
        Інформація про нас
      </Typography>
      {isEdit ? (
        <CoupleProfileForm onCancel={() => setIsEdit(false)} />
      ) : (
        <CoupleProfileView onEdit={() => setIsEdit(true)} />
      )}
    </Box>
  );
};
