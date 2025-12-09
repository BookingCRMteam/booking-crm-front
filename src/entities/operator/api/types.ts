export type Operator = {
  id: number;
  message: string;
};

export type OperatorOnboarding = {
  firstName: string;
  lastName: string;
  website: string;
  phone: string;
};

export type OperatorStatus = 'pending' | 'approved' | 'rejected';
export type OperatorStatusApproved = {
  status: 'approved';
  rejectionReason: null;
};
export type OperatorStatusPending = {
  status: 'pending';
  rejectionReason: null;
};
export type OperatorStatusRejected = {
  status: 'rejected';
  rejectionReason: string;
};

export type OperatorBase = {
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
  philosophy: string;
  photo: string | null;
};

export type OperatorMe = OperatorBase &
  (OperatorStatusApproved | OperatorStatusPending | OperatorStatusRejected);

export type OperatorPopular = OperatorMe & {
  bookingsCount: number;
  toursCount: number;
};

export type OperatorPaidBooking = {
  bookingId: number;
  tourTitle: string;
  customerName: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  totalPriceUAH: string;
  status: 'paid';
  createdAt: string;
};
