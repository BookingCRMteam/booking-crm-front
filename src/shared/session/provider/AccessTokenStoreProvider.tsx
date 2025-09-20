'use client';

import { type FC, createContext, useRef } from 'react';

import type { ProviderProps } from '@/shared/types';

import { createAccessTokenStore } from '../store/accessTokenStore';

interface AccessTokenStoreProviderProps extends ProviderProps {
  accessToken: string | null;
}

type UserStoreApi = ReturnType<typeof createAccessTokenStore>;

export const AccessTokenStoreContext = createContext<UserStoreApi | null>(null);

export const AccessTokenStoreProvider: FC<AccessTokenStoreProviderProps> = ({
  children,
  accessToken,
}) => {
  const storeRef = useRef<UserStoreApi | null>(null);
  if (!storeRef.current) {
    storeRef.current = createAccessTokenStore({ accessToken });
  }

  return (
    <AccessTokenStoreContext.Provider value={storeRef.current}>
      {children}
    </AccessTokenStoreContext.Provider>
  );
};
