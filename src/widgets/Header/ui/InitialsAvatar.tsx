import { type FC } from 'react';

import { Typography, TypographyProps, styled } from '@mui/material';

import { UserRole } from '@/shared/types';

type UserInitialProps = TypographyProps & {
  userRole?: UserRole;
};

const UserInitial = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'userRole',
})<UserInitialProps>(({ theme, userRole }) => ({
  width: 32,
  height: 31,
  padding: '4px 8px',
  borderRadius: '50%',
  backgroundColor:
    userRole === 'operator'
      ? theme.palette.light[400]
      : theme.palette.accent[2],
  color: theme.palette.common.black,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'background-color 0.3s, box-shadow 0.3s',
  '&:hover': {
    backgroundColor:
      userRole === 'operator'
        ? theme.palette.light[300]
        : theme.palette.accent[2],
    boxShadow:
      '0 1px 3px 1px rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  },
  '&:active': {
    backgroundColor:
      userRole === 'operator'
        ? theme.palette.light[500]
        : theme.palette.accent[1],
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)',
  },
}));

type InitialAvatarProps = {
  initial?: string;
  userRole?: UserRole;
};
export const InitialsAvatar: FC<InitialAvatarProps> = ({
  initial = 'U',
  userRole = 'traveler',
}) => {
  return (
    <UserInitial variant="bodyLarge" userRole={userRole}>
      {initial}
    </UserInitial>
  );
};
