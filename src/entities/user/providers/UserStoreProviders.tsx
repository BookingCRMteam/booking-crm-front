'use client';

import { type FC, createContext, useRef } from 'react';

import type { UserWithToken } from '@/shared/lib/auth0';
import type { ProviderProps } from '@/shared/types';

import { createUserStore } from '../model/userStore';

interface UserStoreProviderProps extends ProviderProps {
  userWithToken: UserWithToken | null;
}

type UserStoreApi = ReturnType<typeof createUserStore>;

export const UserStoreContext = createContext<UserStoreApi | null>(null);

export const UserStoreProvider: FC<UserStoreProviderProps> = ({
  children,
  userWithToken,
}) => {
  const storeRef = useRef<UserStoreApi | null>(null);
  if (!storeRef.current) {
    const { user = null, accessToken = null, operator } = userWithToken || {};
    storeRef.current = createUserStore({
      user,
      accessToken,
      operator,
      operatorStatus: operator?.status,
    });
  }

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
};
