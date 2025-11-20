import Image from 'next/image';

import { Box, Typography } from '@mui/material';

import { BOOKING_EMPTY_IMAGE_URL, BOOKING_EMPTY_TEXT } from './constants';

export const OperatorBookingEmpty = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        height: 'calc(100vh - 60px)',
      }}
    >
      <Typography
        variant="bodyLarge"
        component="h3"
        align="center"
        maxWidth={480}
      >
        {BOOKING_EMPTY_TEXT}
      </Typography>
      <Image
        src={BOOKING_EMPTY_IMAGE_URL}
        alt="empty"
        width={495}
        height={192}
      />
    </Box>
  );
};
