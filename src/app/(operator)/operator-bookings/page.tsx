import type { Metadata } from 'next';

import { OperatorBookingPage } from '@/pages-layer/operator-booking';

export const metadata: Metadata = {
  title: 'Бронювання турооператора',
  description: 'Управління бронюваннями турооператора',
};

export default function OperatorBookings() {
  return <OperatorBookingPage />;
}
