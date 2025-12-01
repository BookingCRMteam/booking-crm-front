'use client';

import { Box, Modal, styled } from '@mui/material';

import { useBookingStore } from '@/shared/store';
import { CloseButton } from '@/shared/ui';

import { BookingForm } from '../BookingForm/BookingForm';
import { TourInfoBlock } from '../TourInfoBlock/TourInfoBlock';

type BookingModalProps = {
  forceOpen?: boolean;
  disableSubmit?: boolean;
};

const StyledModal = styled(Modal)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const ModalContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.common.white,
  borderRadius: '8px',
  width: '100%',
  maxWidth: '800px',
  padding: '60px 57px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  boxShadow: theme.shadows[24],
  outline: 'none',
}));

export const BookingModal = ({
  forceOpen = false,
  disableSubmit = false,
}: BookingModalProps) => {
  const { isBookingModalOpen, closeBookingModal } = useBookingStore();

  const open = forceOpen || isBookingModalOpen;

  return (
    <StyledModal
      open={open}
      onClose={closeBookingModal}
      aria-labelledby="booking-modal-title"
    >
      <ModalContent role="dialog" aria-modal="true">
        <CloseButton onClick={closeBookingModal} top={16} right={16} />
        <TourInfoBlock />
        <BookingForm disableSubmit={disableSubmit} />
      </ModalContent>
    </StyledModal>
  );
};
