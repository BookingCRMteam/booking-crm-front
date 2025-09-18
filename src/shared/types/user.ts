import { UserRole } from './roles';

export interface User {
  id: number;
  email: string | null;
  sub: string;
  createdAt: string;
  updatedAt: string;
  operatorId: number | null;
  firstPersonName: string | null;
  firstPersonSurname: string | null;
  secondPersonName: string | null;
  secondPersonSurname: string | null;
  phone: string | null;
  role: UserRole;
}
