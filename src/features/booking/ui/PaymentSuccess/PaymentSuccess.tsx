import { Box, Typography } from '@mui/material';
import { CheckFatIcon } from '@phosphor-icons/react';

import { BookingPaymentResponse } from '@/entities/booking';

import { getTranslation } from '@/shared/lib/translation';
import { DateDisplay, LocationDisplay, PriceDisplay } from '@/shared/ui';
import { formattedDate, formattedPhone } from '@/shared/utils';

const centeredBlock = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export const PaymentSuccess = ({ data }: { data: BookingPaymentResponse }) => {
  const {
    firstPersonName,
    firstPersonSurname,
    secondPersonName,
    secondPersonSurname,
    totalPrice,
    phone,
    tour,
  } = data;

  const email = 'email';

  const country = getTranslation(tour.country.translations, 'uk');
  const city = getTranslation(tour.city.translations, 'uk');

  const date = `${formattedDate(data.tour.startDate)} — ${formattedDate(data.tour.endDate)}`;

  const bookingPhone = formattedPhone(phone);

  return (
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
        <Typography variant="bodyLarge">Ваш тур, оформлений для:</Typography>
        <Box sx={{ ...centeredBlock, gap: '4px' }}>
          <Typography variant="bodyDefault">{`${firstPersonName} ${firstPersonSurname} та ${secondPersonName} ${secondPersonSurname}`}</Typography>
          <Typography variant="bodyDefault">{bookingPhone}</Typography>
        </Box>
        <Box sx={{ ...centeredBlock, gap: '4px' }}>
          <LocationDisplay location={`${country}, ${city}`} />
          <DateDisplay date={date} />
        </Box>
        <Typography variant="bodyLarge">успішно оплачено у розмірі:</Typography>
        <PriceDisplay price={totalPrice} />
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="bodyLarge">{` Лист з підтвердженням бронювання надіслано за адресою: ${email}`}</Typography>
      </Box>
    </>
  );
};
