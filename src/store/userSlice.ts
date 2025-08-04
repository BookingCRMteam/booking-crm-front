import { StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

import { User } from '@/shared/types/user';

// TODO: add all user actions here
export interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const createUserState: StateCreator<
  UserState,
  [['zustand/devtools', never]],
  [['zustand/persist', User | null]]
> = persist(
  (set) => ({
    user: null,
    setUser: (user) => set({ user }, false, 'user/setUser'),
  }),
  {
    name: 'crm_current_user',
    partialize: (state) => state.user,
  },
);
