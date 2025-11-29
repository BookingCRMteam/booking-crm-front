export type Operator = {
  id: number;
  message: string;
};

export type OperatorStatus = 'pending' | 'approved' | 'rejected';

export type OperatorOnboarding = {
  firstName: string;
  lastName: string;
  website: string;
  phone: string;
};

export interface OperatorMe {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  companyName: string;
  description: string;
  firstName: string;
  lastName: string;
  website: string;
  phone: string;
  status: OperatorStatus;
  philosophy: string;
  photo: string;
}

export interface OperatorById {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  companyName: string;
  description: string | null;
  firstName: string;
  lastName: string;
  website: string;
  phone: string;
  status: OperatorStatus;
  philosophy: string | null;
  photo: string | null;
}

export interface OperatorPopular extends OperatorById {
  bookingsCount: number;
  toursCount: number;
}

export interface OperatorBooking {
  bookingId: number;
  tourTitle: string;
  customerName: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  totalPriceUAH: string;
  status: 'paid';
  createdAt: string;
}
