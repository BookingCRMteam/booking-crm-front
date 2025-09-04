'use client';

import { type ReactNode, createContext, useContext, useRef } from 'react';

import { useStore } from 'zustand';

import { User } from '@/shared/types/user';

import { UserStore, createUserStore } from '@/store/userStore';

type UserStoreApi = ReturnType<typeof createUserStore>;

export const UserStoreContext = createContext<UserStoreApi | null>(null);

export const UserStoreProvider = ({
  children,
  user,
  accessToken,
}: {
  children: ReactNode;
  user: User | null;
  accessToken: string | null;
}) => {
  const storeRef = useRef<UserStoreApi | null>(null);
  if (!storeRef.current) {
    storeRef.current = createUserStore({ user, accessToken });
  }

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const userStoreContext = useContext(UserStoreContext);
  if (!userStoreContext) {
    throw new Error('useUserStore must be used within UserStoreProvider');
  }
  return useStore(userStoreContext, selector);
};
