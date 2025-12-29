import { BookingPaymentResponse } from '@/entities/booking';

import { mockTour } from './mockTour';
import { mockUserTraveler } from './mockUser';

export const mockPaidBooking: BookingPaymentResponse = {
  id: 101,
  userId: 10,
  tourId: 100,
  numberOfPeople: 2,
  firstPersonName: 'Олена',
  firstPersonSurname: 'Петренко',
  secondPersonName: 'Олег',
  secondPersonSurname: 'Петренко',
  phone: '+380501112233',
  status: 'confirmed',
  totalPrice: '20000.00',
  currency: 'UAH',
  createdAt: '2025-12-06T12:55:12.441Z',
  updatedAt: '2025-12-06T12:55:12.441Z',
  paymentProvider: 'liqpay',
  paymentSessionId: 'booking_22234_session_56789',
  tour: mockTour,
  user: mockUserTraveler,
};
