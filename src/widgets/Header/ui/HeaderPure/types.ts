import type { OperatorStatus } from '@/entities/operator';

import type { UserRole } from '@/shared/types';

export interface HeaderPureProps {
  userRole?: UserRole;
  firstPersonName?: string;
  operatorStatus?: OperatorStatus;
  isPendingPayment?: boolean;
}
