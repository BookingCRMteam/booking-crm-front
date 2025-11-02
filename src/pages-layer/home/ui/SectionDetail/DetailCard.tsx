import type { FC, ReactNode } from 'react';

import { Box, Card, Typography, styled } from '@mui/material';

type DetailCardProps = {
  title: ReactNode;
  icon: ReactNode;
  description: string;
};

const CardWrapper = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  padding: '0 8px',
  backgroundColor: 'transparent',
  boxShadow: 'none',
});

const CardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
  color: theme.palette.primary.main,
}));

export const DetailCard: FC<DetailCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <CardWrapper>
      <CardHeader>
        {icon}
        <Typography variant="priceHighlight" component="h3">
          {title}
        </Typography>
      </CardHeader>
      <Typography component="p" variant="bodyDefault">
        {description}
      </Typography>
    </CardWrapper>
  );
};
