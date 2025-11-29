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

  const useStore = useOperatorVerificationStore(operatorId);
  const store = useStore?.();

  useEffect(() => {
    if (!store) return;
    const { shownStatuses, markShown, isHydrated } = store;
    if (!isHydrated || !operatorStatus || !operatorId) return;

    const modalConfig = statusToModal[operatorStatus];
    if (!modalConfig) return;

    if (shownStatuses[operatorStatus]) return;

    openModal({
      type: modalConfig.type,
      ...(modalConfig.needsPayload
        ? { payload: { message: rejectedReason } }
        : {}),
    });
    markShown(operatorStatus);
  }, [operatorStatus, rejectedReason, openModal, operatorId, store]);
};
