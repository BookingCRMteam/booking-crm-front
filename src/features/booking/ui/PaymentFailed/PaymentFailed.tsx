import { Box, Typography } from '@mui/material';
import { SmileySadIcon } from '@phosphor-icons/react';

import { RepayBookingButton } from '@/shared/ui';

type PaymentFailedProps = {
  bookingId: number;
};

const centeredBlock = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export const PaymentFailed = ({ bookingId }: PaymentFailedProps) => {
  return (
    <>
      <Box sx={centeredBlock}>
        <Typography variant="h3">Оплата не пройшла</Typography>
      </Box>
      <SmileySadIcon size={48} color={'#D89BF2'} />
      <Typography variant="bodyLarge">
        Схоже, щось пішло не так під час платежу.
      </Typography>
      <Typography variant="bodyLarge" sx={{ textAlign: 'center' }}>
        Не хвилюйтеся — ваш тур нікуди не зник. Спробуйте оплатити ще раз або
        перевірте дані картки.
      </Typography>

      <Box sx={{ width: '100%', maxWidth: 256 }}>
        <RepayBookingButton
          bookingId={bookingId}
          buttonTitle="Спробувати ще раз"
          data-testid="retry-button"
        />
      </Box>
    </>
  );
};
