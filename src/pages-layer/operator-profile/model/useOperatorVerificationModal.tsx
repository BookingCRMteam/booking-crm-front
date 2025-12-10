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
  const rejectedReason = operator?.rejectionReason;

  const useStore = useOperatorVerificationStore(operatorId);

  const { shownStatuses, markShown, isHydrated, resetShownStatuses } =
    useStore();

  useEffect(() => {
    if (!operatorId || !operatorStatus || !resetShownStatuses) return;
    resetShownStatuses(operatorStatus);
  }, [operatorId, operatorStatus, resetShownStatuses]);

  useEffect(() => {
    if (!isHydrated || !operatorStatus || !operatorId) return;

    const modalConfig = statusToModal[operatorStatus];
    if (!modalConfig) return;

    let shouldShow = false;

    if (operatorStatus === 'rejected') {
      shouldShow = true;
    } else {
      if (!shownStatuses[operatorStatus]) {
        shouldShow = true;
      }
    }

    if (shouldShow) {
      openModal({
        type: modalConfig.type,
        ...(modalConfig.needsPayload
          ? { payload: { message: rejectedReason } }
          : {}),
      });

      if (operatorStatus !== 'rejected') {
        markShown(operatorStatus);
      }
    }
  }, [
    operatorStatus,
    rejectedReason,
    openModal,
    operatorId,
    isHydrated,
    shownStatuses,
    markShown,
  ]);
};
