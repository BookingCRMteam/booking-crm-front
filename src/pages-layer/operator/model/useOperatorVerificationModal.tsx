import { useEffect } from 'react';

import { type ModalType, useModalStore } from '@/features/modal';

import type { OperatorStatus } from '@/entities/operator';
import { useOperatorQuery } from '@/entities/operator/model/useOperatorQuery';

import { useOperatorVerificationStore } from './useOperatorVerificationStore';

const statusToModal: Record<
  Exclude<OperatorStatus, null>,
  { type: ModalType; needsPayload?: boolean }
> = {
  rejected: { type: 'operator-verification-rejected', needsPayload: true },
  pending: { type: 'operator-verification-pending' },
  approved: { type: 'operator-verification-success' },
};

export const useOperatorVerificationModal = () => {
  const openModal = useModalStore((s) => s.openModal);

  const { data: operator } = useOperatorQuery();

  const operatorId = operator?.id;
  const operatorStatus = operator?.status;
  // TODO: Оновити після отримання реальної причини відмови з бекенду
  const rejectedReason = 'Причина відмови';

  const store = useOperatorVerificationStore(operatorId);
  const { markShown, shownStatuses, isHydrated } = store();

  useEffect(() => {
    if (!isHydrated || !operatorStatus || !operatorId) {
      console.log('Waiting for hydration, user ID or operator status');
      return;
    }

    const modalConfig = statusToModal[operatorStatus];
    if (!modalConfig) return;

    if (operatorStatus === 'rejected') {
      console.log('rejected - showing modal');
      openModal({
        type: modalConfig.type,
        payload: { message: rejectedReason },
      });
      return;
    }

    if (!shownStatuses[operatorStatus]) {
      openModal({ type: modalConfig.type });
      markShown(operatorStatus);
    }
  }, [
    operatorStatus,
    rejectedReason,
    openModal,
    shownStatuses,
    markShown,
    isHydrated,
    operatorId,
  ]);
};
