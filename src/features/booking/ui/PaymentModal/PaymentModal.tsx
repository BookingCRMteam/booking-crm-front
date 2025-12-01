import { CSSProperties } from 'react';

import { Box, Button, Modal, Typography, styled } from '@mui/material';
import { CheckFatIcon, SmileySadIcon } from '@phosphor-icons/react';

import { PaymentModalData } from '@/entities/booking/model/type';

import {
  CloseButton,
  DateDisplay,
  LocationDisplay,
  PriceDisplay,
} from '@/shared/ui';
import { formattedPhone } from '@/shared/utils';

type PaymentModalProps = {
  status: string | null;
  data: PaymentModalData;
  onClose: () => void;
};

const centeredBlock: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const ModalContent = styled(Box)(({ theme }) => ({
  ...centeredBlock,
  position: 'relative',
  backgroundColor: theme.palette.common.white,
  borderRadius: '8px',
  width: '100%',
  padding: '60px 40px',
  gap: '24px',
  boxShadow: theme.shadows[24],
  outline: 'none',
}));

export const PaymentModal = ({ status, data, onClose }: PaymentModalProps) => {
  const {
    firstPersonName,
    firstPersonSurname,
    secondPersonName,
    secondPersonSurname,
    email,
    totalPrice,
    phone,
  } = data.booking;

  const { countryAndCity, date } = data.tour;

  const bookingPhone = formattedPhone(phone);

  return (
    <Modal
      open
      onClose={onClose}
      sx={centeredBlock}
      aria-labelledby="booking-modal-title"
    >
      <ModalContent
        role="dialog"
        aria-modal="true"
        sx={{
          maxWidth: status === 'success' ? '592px' : '457px',
        }}
      >
        <CloseButton onClick={onClose} top={16} right={16} />

        {status === 'success' && (
          <>
            <Box sx={{ ...centeredBlock, flexDirection: 'row', gap: 1 }}>
              <CheckFatIcon
                size={28}
                color="#83C5BE"
                weight="fill"
                data-testid="success-icon"
              />
              <Typography variant="h3">Бронювання підтверджено! </Typography>
            </Box>
            <Box sx={{ ...centeredBlock, gap: '12px' }}>
              <Typography variant="bodyLarge">
                Ваш тур, оформлений для:
              </Typography>
              <Box sx={{ ...centeredBlock, gap: '4px' }}>
                <Typography variant="bodyDefault">{`${firstPersonName} ${firstPersonSurname} та ${secondPersonName} ${secondPersonSurname}`}</Typography>
                <Typography variant="bodyDefault">{bookingPhone}</Typography>
              </Box>
              <Box sx={{ ...centeredBlock, gap: '4px' }}>
                <LocationDisplay location={countryAndCity} />
                <DateDisplay date={date} />
              </Box>
              <Typography variant="bodyLarge">
                успішно оплачено у розмірі:
              </Typography>
              <PriceDisplay price={totalPrice} />
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="bodyLarge">{` Лист з підтвердженням бронювання надіслано за адресою: ${email}`}</Typography>
            </Box>
          </>
        )}

        {status === 'failed' && (
          <>
            <Box sx={centeredBlock}>
              <Typography variant="h3">Оплата не пройшла</Typography>
            </Box>
            <SmileySadIcon size={48} color={'#D89BF2'} />
            <Typography variant="bodyLarge">
              Схоже, щось пішло не так під час платежу.
            </Typography>
            <Typography variant="bodyLarge" sx={{ textAlign: 'center' }}>
              Не хвилюйтеся — ваш тур нікуди не зник. Спробуйте оплатити ще раз
              або перевірте дані картки.
            </Typography>

            <Button variant="contained">Спробувати ще раз</Button>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
