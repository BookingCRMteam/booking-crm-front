import { OperatorMe } from '@/entities/operator';
import { User } from '@/entities/user';

export type UserWithToken = {
  user: User | null;
  accessToken: string;
  operator: OperatorMe | null;
};
