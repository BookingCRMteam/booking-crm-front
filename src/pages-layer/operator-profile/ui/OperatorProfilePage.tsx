'use client';

import { OperatorProfile } from '@/features/operator-profile';

import { useOperatorVerificationModal } from '../model/useOperatorVerificationModal';

export const OperatorProfilePage = () => {
  useOperatorVerificationModal();

  return <OperatorProfile />;
};
