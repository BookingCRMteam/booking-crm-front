'use client';

import type { FC } from 'react';

import { Box, Button, Typography } from '@mui/material';

import { useUserQuery } from '@/entities/user';

import UserInfo from './UserInfo';

interface CoupleProfileViewProps {
  onEdit: () => void;
}

export const CoupleProfileView: FC<CoupleProfileViewProps> = ({ onEdit }) => {
  const { data: user } = useUserQuery();

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  const {
    firstPersonName,
    firstPersonSurname,
    secondPersonName,
    secondPersonSurname,
    phone,
    email,
  } = user;

  const isProfileComplete =
    !!firstPersonName &&
    !!firstPersonSurname &&
    !!secondPersonName &&
    !!secondPersonSurname &&
    !!phone;

  const userInfoData = isProfileComplete && {
    firstPersonName,
    firstPersonSurname,
    secondPersonName,
    secondPersonSurname,
    phone,
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '28px',
        pt: '28px',
      }}
    >
      {isProfileComplete && userInfoData ? (
        <UserInfo {...userInfoData} />
      ) : (
        <Typography
          variant="bodyLarge"
          component="p"
          sx={{ textAlign: 'center' }}
        >
          У профілі бракує інформації.
          <br />
          Додайте основні дані про себе — це займе лише кілька хвилин.
        </Typography>
      )}
      {email && (
        <Typography variant="bodyLarge" component="p">
          {email}
        </Typography>
      )}
      <Button
        onClick={onEdit}
        variant="contained"
        color="primary"
        size="large"
        sx={{ maxWidth: '200px', width: '100%', placeSelf: 'center' }}
      >
        Редагувати
      </Button>
    </Box>
  );
};
