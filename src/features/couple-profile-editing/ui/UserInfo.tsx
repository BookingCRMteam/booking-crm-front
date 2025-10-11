import { FC } from 'react';

import { Box, Typography } from '@mui/material';
import { PhoneIcon } from '@phosphor-icons/react/dist/ssr/Phone';

type UserInfoProps = {
  firstPersonName: string;
  firstPersonSurname: string;
  secondPersonName: string;
  secondPersonSurname: string;
  phone: string;
};

const UserInfo: FC<UserInfoProps> = ({
  firstPersonName,
  firstPersonSurname,
  phone,
  secondPersonName,
  secondPersonSurname,
}) => {
  return (
    <>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 500,
          textAlign: 'center',
        }}
      >
        {`${firstPersonName} ${firstPersonSurname}`} та{' '}
        {`${secondPersonName} ${secondPersonSurname}`}
      </Typography>
      <Box sx={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
        <PhoneIcon
          size={24}
          weight="regular"
          color="#000"
          style={{ rotate: '0deg' }}
        />
        <Typography variant="bodyLarge">{phone}</Typography>
      </Box>
    </>
  );
};

export default UserInfo;
