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

export type BookingPaymentResponse = {
  id: number;
  userId: number;
  firstPersonName: string;
  firstPersonSurname: string;
  secondPersonName: string;
  secondPersonSurname: string;
  phone: string;
  numberOfPeople: number;
  paymentProvider: string;
  status: 'pending_payment' | 'confirmed' | 'failed'; //уточнити
  totalPrice: string;
  tourId: number;
  paymentSessionId: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
  tour: {
    id: number;
    operatorId: number;
    title: string;
    startDate: string;
    endDate: string;
    price: string;
    cityId: number;
    description: string;
    availableSpots: number;
    type: string;
    isActive: boolean;
    conditions: string;
    countryISO2Code: string;
    createdAt: string;
    updatedAt: string;
  };
};
