import { useContext } from 'react';

import { useStore } from 'zustand';

import { AccessTokenStoreContext } from '../provider/AccessTokenStoreProvider';
import type { AccessTokenStore } from './accessTokenStore';

export const useAccessTokenStore = <T>(
  selector: (store: AccessTokenStore) => T,
): T => {
  const accessTokenStoreContext = useContext(AccessTokenStoreContext);
  if (!accessTokenStoreContext) {
    throw new Error(
      'useAccessTokenStore must be used within AccessTokenStoreProvider',
    );
  }
  return useStore(accessTokenStoreContext, selector);
};
