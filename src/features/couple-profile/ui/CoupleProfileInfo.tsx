'use client';

import type { FC } from 'react';

import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { Box, Button, Typography } from '@mui/material';

import type { User } from '@/entities/user';

interface CoupleProfileInfo {
  onEdit: () => void;
  user: User;
}

export const CoupleProfileInfo: FC<CoupleProfileInfo> = ({ user, onEdit }) => {
  const {
    phone,
    email,
    firstPersonName,
    firstPersonSurname,
    secondPersonName,
    secondPersonSurname,
  } = user;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Typography>
        {`${firstPersonName || ''} ${firstPersonSurname || ''}`}
      </Typography>
      {(secondPersonName || secondPersonName) && (
        <Typography>
          {`${secondPersonName || ''} ${secondPersonSurname || ''}`}
        </Typography>
      )}
      {phone && (
        <Box sx={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <LocalPhoneOutlinedIcon />
          <Typography>{phone}</Typography>
        </Box>
      )}
      {email && <Typography>{user.email}</Typography>}
      <Button
        onClick={onEdit}
        variant="contained"
        sx={{ width: 'fit-content', placeSelf: 'center' }}
      >
        Редагувати
      </Button>
    </Box>
  );
};
