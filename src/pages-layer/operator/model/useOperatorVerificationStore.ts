import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { OperatorStatus } from '@/entities/operator';

interface OperatorVerificationState {
  shownStatuses: {
    rejected: boolean;
    pending: boolean;
    approved: boolean;
  };
  markShown: (status: OperatorStatus) => void;
  isHydrated: boolean;
  setHydrated: (isHydrated: boolean) => void;
}

const userStores = new Map();

const createTemporaryStore = () =>
  create<OperatorVerificationState>()((set) => ({
    shownStatuses: {
      rejected: false,
      pending: false,
      approved: false,
    },
    markShown: (status) =>
      set((s) => ({
        shownStatuses: { ...s.shownStatuses, [status]: true },
      })),
    isHydrated: false,
    setHydrated: (isHydrated) => set({ isHydrated }),
  }));

export const useOperatorVerificationStore = (operatorId?: number) => {
  if (!operatorId) {
    return createTemporaryStore();
  }

  if (userStores.has(operatorId)) {
    return userStores.get(operatorId);
  }

  const newStore = create<OperatorVerificationState>()(
    persist(
      (set) => ({
        shownStatuses: {
          rejected: false,
          pending: false,
          approved: false,
        },
        markShown: (status) =>
          set((s) => ({
            shownStatuses: { ...s.shownStatuses, [status]: true },
          })),
        isHydrated: false,
        setHydrated: (isHydrated) => set({ isHydrated }),
      }),
      {
        name: `operator-verification-${operatorId}`,
        onRehydrateStorage: () => (state) => {
          if (state) state.setHydrated(true);
        },
      },
    ),
  );

  userStores.set(operatorId, newStore);

  return newStore;
};
