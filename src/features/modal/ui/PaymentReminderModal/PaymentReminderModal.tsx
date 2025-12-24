import type { FC } from 'react';

import { Box, Typography } from '@mui/material';

import { BookingTimer, RepayBookingButton } from '@/shared/ui';

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
  const [firstLine, secondLine, thirdLine] = MODAL_PAYMENT_REMINDER_DESCRIPTION;
  return (
    <ModalWrapper size="large" title={MODAL_PAYMENT_REMINDER_TITLE}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="bodyLarge" align="center">
          {firstLine.text}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography variant="bodyLarge" align="center">
            {secondLine.text}
          </Typography>
          <BookingTimer bookingId={bookingId} variant="modal" />
        </Box>
        <Typography variant="bodyLarge" align="center">
          {thirdLine.text}
        </Typography>
      </Box>
      <RepayBookingButton sx={{ maxWidth: '331px' }} bookingId={bookingId} />
    </ModalWrapper>
  );
};
