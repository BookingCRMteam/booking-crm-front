import type { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Box, Button, Card, Typography, styled } from '@mui/material';

import { OperatorStatusBadge } from '@/shared/ui';

import { OperatorCardProps } from './types';

const CardWrapper = styled(Card)(({ theme }) => ({
  padding: '12px 16px 40px',
  borderRadius: '4px',
  border: `0.40px solid ${theme.palette.light[700]}`,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}));

const CardTitle = styled(Box)({
  display: 'flex',
  gap: '16px',
});

const InfoWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: '100%',
  paddingBottom: '3px',
  '& .operator-badge': {
    alignSelf: 'end',
  },
});

const OperatorDescription = styled(Typography)({
  width: '100%',
  maxWidth: 299,
  height: 54,
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'break-word',
});

export const OperatorCard: FC<OperatorCardProps> = ({
  toursCount,
  description,
  photo,
  firstName,
  lastName,
  status,
  id,
}) => {
  const photoSrc = photo || '/images/operator_placeholder.png';
  const operatorHref = `/catalog/operator/${id}`;
  return (
    <CardWrapper>
      <CardTitle>
        <Image
          width={65}
          height={65}
          alt={`${firstName} ${lastName}`}
          src={photoSrc}
        />
        <InfoWrapper>
          <Typography variant="h3">
            {firstName}
            <br />
            {lastName}
          </Typography>
          <OperatorStatusBadge
            status={status}
            className="operator-badge"
            size="small"
          />
        </InfoWrapper>
      </CardTitle>
      <OperatorDescription variant="bodySmall">
        {description}
      </OperatorDescription>
      <Typography variant="bodyDefault" align="center">
        {`Актуальні подорожі (${toursCount})`}
      </Typography>
      <Button
        component={Link}
        href={operatorHref}
        variant="outlined"
        color="secondary"
        size="large"
      >
        Переглянути
      </Button>
    </CardWrapper>
  );
};
