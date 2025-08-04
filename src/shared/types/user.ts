import { UserRole } from './roles';

// TODO: Додати всі поля з бекенду
export interface User {
  createdAt: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  operatorId: number;
  passwordHash: string;
  phone: string;
  role: UserRole;
  sub: string;
  updatedAt: string;
}
