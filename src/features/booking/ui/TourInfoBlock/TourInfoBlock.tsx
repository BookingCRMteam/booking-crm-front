import React from 'react';

import { Box, Typography } from '@mui/material';

import { TourBookingInfo } from '@/entities/tour/model/types';

interface TourInfoBlockProps {
  tourData: TourBookingInfo;
}

export const TourInfoBlock = ({ tourData }: TourInfoBlockProps) => {
  const { title, price, countryAndCity, date } = tourData;

  return (
    <Box>
      <Typography>{title}</Typography>
      <Typography>{countryAndCity}</Typography>
      <Typography>{date}</Typography>
      <Typography>{`$${price}`}</Typography>
    </Box>
  );
};
