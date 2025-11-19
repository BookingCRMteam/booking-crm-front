'use client';

import { useCallback, useState } from 'react';

import { Box, Typography } from '@mui/material';

import { CoupleProfileForm } from './CoupleProfileForm';
import { CoupleProfileView } from './CoupleProfileView';

export const CoupleProfileEditing = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEdit = useCallback(() => setIsEdit(true), []);
  const handleCancel = useCallback(() => setIsEdit(false), []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
      data-testid="couple-profile-editing"
    >
      <Typography align="center" variant="h2" component="h2" gutterBottom>
        Інформація про нас
      </Typography>

      {isEdit ? (
        <CoupleProfileForm onCancel={handleCancel} />
      ) : (
        <CoupleProfileView onEdit={handleEdit} />
      )}
    </Box>
  );
};
