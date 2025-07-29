import { StateCreator } from 'zustand';

import { User } from '@/shared/types/user';

// TODO: Додати всі методи для роботи з користувачем
export interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const createUserState: StateCreator<UserState> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
});
