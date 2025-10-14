'use client';

import type { FC } from 'react';

import { Box, Button, Typography } from '@mui/material';

import { useUserQuery } from '@/entities/user';

import { getCoupleProfileData } from '../model/getCoupleProfileData';
import { UserInfo } from './UserInfo';

interface CoupleProfileViewProps {
  onEdit: () => void;
}

export const CoupleProfileView: FC<CoupleProfileViewProps> = ({ onEdit }) => {
  const { data: user, isLoading, error } = useUserQuery();

  if (isLoading) {
    return <Typography>Завантаження...</Typography>;
  }

  if (error) {
    return <Typography color="error">Помилка завантаження профілю</Typography>;
  }

  if (!user) {
    return <Typography>Профіль не знайдено</Typography>;
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

  const userInfoData = isProfileComplete ? getCoupleProfileData(user) : null;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3.5,
        pt: 3.5,
      }}
      data-testid="couple-profile-view"
    >
      {userInfoData ? (
        <UserInfo {...userInfoData} />
      ) : (
        <Typography
          variant="bodyLarge"
          component="p"
          textAlign="center"
          data-testid="incomplete-profile-message"
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
        sx={{ maxWidth: 200, width: '100%', placeSelf: 'center' }}
        data-testid="edit-button"
      >
        Редагувати
      </Button>
    </Box>
  );
};
