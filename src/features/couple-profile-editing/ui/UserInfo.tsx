import type { FC } from 'react';

import { Box, Typography, styled } from '@mui/material';

export interface UserInfoProps {
  firstPersonName: string;
  firstPersonSurname: string;
  secondPersonName: string;
  secondPersonSurname: string;
  phone: string;
  email: string;
}

const InfoWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '510px',
});

export const UserInfo: FC<UserInfoProps> = ({
  firstPersonName,
  firstPersonSurname,
  secondPersonName,
  secondPersonSurname,
  phone,
  email,
}) => {
  return (
    <InfoWrapper data-testid="user-info">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          padding: '13px 0 22px',
        }}
      >
        <Typography variant="bodyDefault" width={153}>
          Ім’я та прізвища:
        </Typography>
        <Typography variant="bodyLarge">
          {firstPersonName} {firstPersonSurname} та {secondPersonName}{' '}
          {secondPersonSurname}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          padding: '13px 0 22px',
        }}
      >
        <Typography variant="bodyDefault" width={153}>
          Телефон:
        </Typography>
        <Typography variant="bodyLarge">{phone}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          padding: '13px 0 22px',
        }}
      >
        <Typography variant="bodyDefault" width={153}>
          Електрона пошта:
        </Typography>
        <Typography variant="bodyLarge">{email}</Typography>
      </Box>
    </InfoWrapper>
  );
};
