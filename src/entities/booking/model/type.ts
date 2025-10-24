export type BookingRequest = {
  tourId: number;
  userId: number;
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
