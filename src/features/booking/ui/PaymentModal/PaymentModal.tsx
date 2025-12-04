import { Box, Modal, styled } from '@mui/material';

import { PaymentFailed, PaymentSuccess } from '@/features/booking';

import { BookingPaymentResponse } from '@/entities/booking';

import { CloseButton } from '@/shared/ui';

type PaymentModalProps = {
  data: BookingPaymentResponse;
  onClose: () => void;
};

const ModalWrapper = styled(Modal)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const ModalContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  backgroundColor: theme.palette.common.white,
  borderRadius: '8px',
  width: '100%',
  padding: '60px 40px',
  gap: '24px',
  boxShadow: theme.shadows[24],
  outline: 'none',
}));

export const PaymentModal = ({ data, onClose }: PaymentModalProps) => {
  const { status } = data;

  return (
    <ModalWrapper open onClose={onClose} aria-label="Оплата туру">
      <ModalContent
        role="dialog"
        aria-modal="true"
        sx={{
          maxWidth: status === 'confirmed' ? '592px' : '457px',
        }}
      >
        <CloseButton onClick={onClose} top={16} right={16} />

        {status === 'confirmed' && <PaymentSuccess data={data} />}

        {status === 'pending_payment' && <PaymentFailed />}
      </ModalContent>
    </ModalWrapper>
  );
};
