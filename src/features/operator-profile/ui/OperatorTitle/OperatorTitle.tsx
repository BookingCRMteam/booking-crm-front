import type { FC } from 'react';

import { Box, BoxProps, Typography, styled } from '@mui/material';

import type { OperatorMe } from '@/entities/operator';

import { OperatorStatusBadge, Phone } from '@/shared/ui';

type OperatorTitleProps = Pick<
  OperatorMe,
  'email' | 'firstName' | 'lastName' | 'phone' | 'status' | 'website'
> & {
  isEdit?: boolean;
};

interface PersonalInfoProps extends BoxProps {
  isEdit?: boolean;
}

const PersonalInfo = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isEdit',
})<PersonalInfoProps>(({ theme, isEdit }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  color: isEdit ? theme.palette.gray[700] : theme.palette.text.primary,
}));

const NameWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const OperatorTitle: FC<OperatorTitleProps> = ({
  email,
  firstName,
  lastName,
  phone,
  website,
  status,
  isEdit = false,
}) => {
  return (
    <PersonalInfo isEdit={isEdit}>
      <NameWrapper>
        <Typography variant="h2" component="h2">
          {firstName} {lastName}
        </Typography>
        <OperatorStatusBadge status={status} />
      </NameWrapper>
      <Phone phone={phone} />
      <Typography variant="bodyLarge" component="p">
        {email}
      </Typography>
      <Typography variant="bodyLarge" component="p">
        {website}
      </Typography>
    </PersonalInfo>
  );
};
