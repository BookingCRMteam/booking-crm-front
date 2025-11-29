import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware';

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

const userStores = new Map<number, ReturnType<typeof createTemporaryStore>>();

const initialState = {
  shownStatuses: { rejected: false, pending: false, approved: false },
  isHydrated: false,
} as const;

const createTemporaryStore = () =>
  create<OperatorVerificationState>()((set) => ({
    ...initialState,
    markShown: (status) =>
      set((s) => ({ shownStatuses: { ...s.shownStatuses, [status]: true } })),
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
        ...initialState,
        markShown: (status) =>
          set((s) => ({
            shownStatuses: { ...s.shownStatuses, [status]: true },
          })),
        setHydrated: (isHydrated) => set({ isHydrated }),
      }),
      {
        name: `operator-verification-${operatorId}`,
        storage:
          typeof window !== 'undefined'
            ? createJSONStorage(() => localStorage)
            : undefined,
        partialize: (s) => ({ shownStatuses: s.shownStatuses }),
        onRehydrateStorage: () => (state) => {
          if (state) state.setHydrated(true);
        },
      },
    ),
  );

  userStores.set(operatorId, newStore);

  return newStore;
};
