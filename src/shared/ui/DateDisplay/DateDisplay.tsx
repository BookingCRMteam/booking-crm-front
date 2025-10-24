'use client';

import { Box, Typography, TypographyProps, styled } from '@mui/material';
import { CalendarDotsIcon } from '@phosphor-icons/react';

type DateDisplayProps = {
  date: string;
};

const DateContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const DateText = styled(Typography)<TypographyProps>({
  fontFamily: 'Inter',
  letterSpacing: '0.035em',
});

export const DateDisplay = ({ date }: DateDisplayProps) => {
  return (
    <DateContainer>
      <CalendarDotsIcon size={24} color="#007A78" />
      <DateText variant="bodyLarge" component="p">
        {date}
      </DateText>
    </DateContainer>
  );
};
