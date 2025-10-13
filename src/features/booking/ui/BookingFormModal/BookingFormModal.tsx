import React from 'react';

import { Box, Modal } from '@mui/material';

import { TourBookingInfo } from '@/entities/tour/model/types';

import { CloseButton } from '@/shared/ui/CloseButton';

import { BookingForm } from '../BookingForm/BookingForm';
import { TourInfoBlock } from '../TourInfoBlock/TourInfoBlock';

type BookingFormModalProps = {
  open: boolean;
  onClose: () => void;
  tourData: TourBookingInfo;
};

export const BookingFormModal = ({
  open,
  onClose,
  tourData,
}: BookingFormModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'white',
          borderRadius: 3,
          width: '100%',
          maxWidth: 800,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          boxShadow: 24,
        }}
      >
        <CloseButton onClick={onClose} />
        <TourInfoBlock tourData={tourData} />
        <BookingForm tourId={tourData.tourId} onClose={onClose} />
      </Box>
    </Modal>
  );
};
