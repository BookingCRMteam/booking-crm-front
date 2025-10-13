import React from 'react';

import { Button, Typography } from '@mui/material';

type BookingFormProps = {
  tourId: number;
  onClose: () => void;
};

export const BookingForm = ({ tourId, onClose }: BookingFormProps) => {
  return (
    <>
      <Typography variant="h6" align="center">
        Форма бронювання туру
      </Typography>

      <Typography>{tourId}</Typography>

      <Button variant="contained" onClick={onClose}>
        Підтвердити бронювання
      </Button>
    </>
  );
};
