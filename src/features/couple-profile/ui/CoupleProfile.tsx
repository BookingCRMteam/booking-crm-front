'use client';

import { useState } from 'react';

import { Box, Typography } from '@mui/material';

import { useUserQuery } from '@/entities/user';

import { CoupleProfileForm } from './CoupleProfileForm';
import { CoupleProfileInfo } from './CoupleProfileInfo';

export const CoupleProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { data: user } = useUserQuery();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Typography align="center" variant="h5" component="h3">
        Інформація про нас
      </Typography>
      {user &&
        (isEdit ? (
          <CoupleProfileForm onCancel={() => setIsEdit(false)} />
        ) : (
          <CoupleProfileInfo user={user} onEdit={() => setIsEdit(true)} />
        ))}
    </Box>
  );
};
