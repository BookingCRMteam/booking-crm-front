import { UserRole } from '@/shared/types';

export interface User {
  id: number;
  email: string;
  sub: string;
  createdAt: string;
  updatedAt: string;
  operatorId: number | null;
  firstPersonName: string;
  firstPersonSurname: string | null;
  secondPersonName: string | null;
  secondPersonSurname: string | null;
  phone: string | null;
  role: UserRole;
}

export type UserUpdate = {
  firstPersonName?: string;
  firstPersonSurname?: string;
  secondPersonName?: string;
  secondPersonSurname?: string;
  phone?: string;
  email?: string;
};
