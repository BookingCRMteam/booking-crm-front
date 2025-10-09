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
  email: string | null;
  createdAt: string;
  updatedAt: string;
  userId: number;
  companyName: string;
  description: string;
  firstName: string | null;
  lastName: string | null;
  website: string;
  phone: string;
  status: OperatorStatus;
  philosophy: string;
  photo: null | string;
}

export interface OperatorById {
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
  philosophy: string | null;
  photo: string | null;
}
