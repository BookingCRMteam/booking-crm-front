import { getAccessToken } from '@auth0/nextjs-auth0';

import { devtools } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

import { User } from '@/shared/types/user';

export type UserState = {
  user: User | null;
  accessToken: string | null;
};

export type UserActions = {
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  ensureAccessToken: () => Promise<string | null>;
  refreshAccessToken: () => Promise<string | null>;
  clearAuth: () => void;
};

type Internal = {
  _tokenPromise: Promise<string | null> | null;
};

export type UserStore = UserState & UserActions & Internal;

export const defaultInitState: UserState = {
  user: null,
  accessToken: null,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()(
    devtools(
      (set, get) => ({
        ...initState,
        _tokenPromise: null,

        setUser: (user) => set({ user }),
        setAccessToken: (token) => set({ accessToken: token }),

        clearAuth: () => set({ user: null, accessToken: null }),

        ensureAccessToken: async () => {
          if (typeof window === 'undefined') {
            return get().accessToken ?? null;
          }

          const cached = get().accessToken;
          if (cached) return cached;

          const inFlight = get()._tokenPromise;
          if (inFlight) return inFlight;

          const p = (async () => {
            try {
              const accessToken = await getAccessToken();
              set({ accessToken });
              return accessToken;
            } catch (e) {
              console.error('ensureAccessToken failed', e);
              set({ accessToken: null });
              return null;
            } finally {
              set({ _tokenPromise: null });
            }
          })();

          set({ _tokenPromise: p });
          return p;
        },

        refreshAccessToken: async () => {
          set({ accessToken: null });
          return get().ensureAccessToken();
        },
      }),
      { name: 'user' },
    ),
  );
};
