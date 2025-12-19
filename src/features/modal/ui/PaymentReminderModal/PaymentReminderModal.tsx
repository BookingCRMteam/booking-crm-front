import type { FC } from 'react';

import { Box, Typography } from '@mui/material';

import { RepayBookingButton } from '@/shared/ui';

import { ModalWrapper } from '../ModalWrapper';
import {
  MODAL_PAYMENT_REMINDER_DESCRIPTION,
  MODAL_PAYMENT_REMINDER_TITLE,
} from './constants';

export type PaymentReminderModalProps = {
  bookingId: number;
};

export const PaymentReminderModal: FC<PaymentReminderModalProps> = ({
  bookingId,
}) => {
  return (
    <ModalWrapper size="large" title={MODAL_PAYMENT_REMINDER_TITLE} isBorder>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {MODAL_PAYMENT_REMINDER_DESCRIPTION.map((item) => (
          <Typography variant="bodyLarge" key={item.id} align="center">
            {item.text}
          </Typography>
        ))}
      </Box>
      <RepayBookingButton sx={{ maxWidth: '331px' }} bookingId={bookingId} />
    </ModalWrapper>
  );
};
