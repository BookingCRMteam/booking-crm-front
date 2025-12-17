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
    status: 'pending_payment' | 'confirmed';
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
  tourId: number;
  numberOfPeople: number;
  firstPersonName: string;
  firstPersonSurname: string;
  secondPersonName: string;
  secondPersonSurname: string;
  phone: string;
  status: 'pending_payment' | 'confirmed';
  totalPrice: string;
  currency: 'UAH' | 'EUR';
  createdAt: string;
  updatedAt: string;
  paymentProvider: 'liqpay';
  paymentSessionId: string;
  tour: {
    id: number;
    operatorId: number;
    title: string;
    description: string;
    countryISO2Code: string;
    cityId: number;
    type: string | null;
    price: string;
    currency: 'UAH' | 'EUR';
    startDate: string;
    endDate: string;
    availableSpots: number;
    isActive: boolean;
    conditions: string | null;
    createdAt: string;
    updatedAt: string;
  };
};

export type UserBooking = {
  bookingId: number;
  status: string;
  bookingPrice: string;
  currency: string;
  numberOfPeople: number;
  firstPersonName: string;
  phone: string;
  paymentLink: string | null;
  canRetryPayment: boolean;
  tour: {
    id: number;
    operatorId: number;
    title: string;
    description: string;
    countryISO2Code: string;
    cityId: number;
    type: string | null;
    price: string;
    currency: string;
    startDate: string;
    endDate: string;
    availableSpots: number;
    conditions: string | null;
    isActive: boolean;
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
    photos: {
      isMain: boolean;
      description: string;
      url: string;
    }[];
    operator: {
      id: number;
      firstName: string;
      lastName: string;
      photo: string;
    };
    city: {
      id: number;
      name: string;
    };
    country: {
      iso2: string;
      name: string;
    };
  };
};
