import { UserRole } from './roles';

// TODO: Додати всі поля з бекенду
export interface User {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
  picture?: string;
  nickname?: string;
}
