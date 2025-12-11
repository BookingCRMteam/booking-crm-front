import { Box, Button, Typography } from '@mui/material';
import { SmileySadIcon } from '@phosphor-icons/react';

type PaymentFailedProps = {
  onRetry?: () => void;
};

const centeredBlock = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export const PaymentFailed = ({ onRetry }: PaymentFailedProps) => {
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

      <Button variant="contained" onClick={onRetry} data-testid="retry-button">
        Спробувати ще раз
      </Button>
    </>
  );
};
