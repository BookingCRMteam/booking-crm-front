import type { FC } from 'react';

import { Box, Typography } from '@mui/material';
import { PhoneIcon } from '@phosphor-icons/react/dist/ssr/Phone';

export interface UserInfoProps {
  firstPersonName: string;
  firstPersonSurname: string;
  secondPersonName: string;
  secondPersonSurname: string;
  phone: string;
}

export const UserInfo: FC<UserInfoProps> = ({
  firstPersonName,
  firstPersonSurname,
  secondPersonName,
  secondPersonSurname,
  phone,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3.5,
      }}
      data-testid="user-info"
    >
      <Typography variant="h3" fontWeight={500}>
        {`${firstPersonName} ${firstPersonSurname}`} та{' '}
        {`${secondPersonName} ${secondPersonSurname}`}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PhoneIcon size={24} weight="regular" color="currentColor" />
        <Typography variant="bodyLarge">{phone}</Typography>
      </Box>
    </Box>
  );
};
