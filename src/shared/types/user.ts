import { UserRole } from './roles';

// TODO: Додати всі поля з бекенду
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
