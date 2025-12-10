import { type StateCreator, create } from 'zustand';
import {
  type PersistOptions,
  createJSONStorage,
  persist,
} from 'zustand/middleware';

import type { OperatorStatus } from '@/entities/operator';

type StoredStatus = Exclude<OperatorStatus, 'rejected' | null>;

interface OperatorVerificationState {
  shownStatuses: Record<StoredStatus, boolean>;

  markShown: (status: StoredStatus) => void;
  resetShownStatuses: (currentStatus: OperatorStatus) => void;

  isHydrated: boolean;
  setHydrated: (isHydrated: boolean) => void;
}

const initialState: Pick<
  OperatorVerificationState,
  'shownStatuses' | 'isHydrated'
> = {
  shownStatuses: { pending: false, approved: false },
  isHydrated: false,
};

const createStateCreator: StateCreator<OperatorVerificationState> = (set) => ({
  ...initialState,

  markShown: (status) =>
    set((s) => ({ shownStatuses: { ...s.shownStatuses, [status]: true } })),

  resetShownStatuses: (currentStatus) => {
    set((s) => ({
      shownStatuses: Object.keys(s.shownStatuses).reduce(
        (acc, statusKey) => {
          const key = statusKey as StoredStatus;
          acc[key] = key === currentStatus ? s.shownStatuses[key] : false;
          return acc;
        },
        {} as Record<StoredStatus, boolean>,
      ),
    }));
  },

  setHydrated: (isHydrated) => set({ isHydrated }),
});

type PersistedState = Pick<OperatorVerificationState, 'shownStatuses'>;

const storeCreator = (isPersistent: boolean, operatorId?: number) => {
  if (!isPersistent || !operatorId) {
    return create<OperatorVerificationState>()(createStateCreator);
  }

  const persistOptions: PersistOptions<PersistedState> = {
    name: `operator-verification-${operatorId}`,
    storage:
      typeof window !== 'undefined'
        ? createJSONStorage(() => localStorage)
        : undefined,
    partialize: (s) => ({ shownStatuses: s.shownStatuses }),
    onRehydrateStorage: () => (state) => {
      if (state) {
        (state as OperatorVerificationState).setHydrated(true);
      }
    },
  };

  return create<OperatorVerificationState>()(
    persist(
      createStateCreator,
      persistOptions as unknown as PersistOptions<OperatorVerificationState>,
    ) as unknown as StateCreator<OperatorVerificationState>,
  );
};

const userStores = new Map<number, ReturnType<typeof storeCreator>>();
const TemporaryStore = storeCreator(false);

export const useOperatorVerificationStore = (operatorId?: number) => {
  if (!operatorId) {
    return TemporaryStore;
  }

  if (userStores.has(operatorId)) {
    return userStores.get(operatorId)!;
  }

  const newStore = storeCreator(true, operatorId);
  userStores.set(operatorId, newStore);

  return newStore;
};
