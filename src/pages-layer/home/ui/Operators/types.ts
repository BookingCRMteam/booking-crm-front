import { OperatorStatus } from '@/entities/operator';

export type OperatorCardProps = {
  photo: string | null;
  firstName: string;
  lastName: string;
  status: OperatorStatus;
  description: string | null;
  activeToursCount: number;
  id: number;
};
