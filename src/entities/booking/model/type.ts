export type BookingRequest = {
  tourId: number;
  userId: number;
  numberOfPeople: number;
  firstPersonName: string;
  firstPersonSurname: string;
  secondPersonName: string;
  secondPersonSurname: string;
  phone: string;
  paymentProvider: 'liqpay';
};

export type BookingResponse = {
  message: string;
  booking: {
    id: number;
    userId: number;
    tourId: number;
    status: 'pending_payment' | 'paid' | 'canceled';
    totalPrice: string;
    currency: 'UAH' | 'EUR'; //зараз сервер повертає євро
    createdAt: string;
    updatedAt: string;
    paymentProvider: 'liqpay';
    paymentSessionId: string | null;
  };
  paymentLink: string;
};

//endpoint is in progress
export type BookingPaymentResponse = {
  status: 'pending' | 'success' | 'failed';
  booking: {
    id: number;
    userId: number;
    firstPersonName: string;
    firstPersonSurname: string;
    secondPersonName: string;
    secondPersonSurname: string;
    phone: string;
    email: string;
    tourId: number;
    totalPrice: string;
    paymentLink: string;
  };
};

export type PaymentModalData = BookingPaymentResponse & {
  tour: {
    date: string;
    countryAndCity: string;
  };
};
