import { getAccessToken } from '@auth0/nextjs-auth0';
import { devtools } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

type AccessTokenState = {
  accessToken: string | null;
};

type AccessTokenActions = {
  setAccessToken: (token: string | null) => void;
  ensureAccessToken: () => Promise<string | null>;
  refreshAccessToken: () => Promise<string | null>;
  clearAuth: () => void;
};

type Internal = {
  _tokenPromise: Promise<string | null> | null;
};

export type AccessTokenStore = AccessTokenState & AccessTokenActions & Internal;

const defaultInitState: AccessTokenState = {
  accessToken: null,
};

export const createAccessTokenStore = (
  initState: AccessTokenState = defaultInitState,
) => {
  return createStore<AccessTokenStore>()(
    devtools(
      (set, get) => ({
        ...initState,
        _tokenPromise: null,

        setAccessToken: (token) => set({ accessToken: token }),

        clearAuth: () => set({ accessToken: null }),

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
      { name: 'accessToken' },
    ),
  );
};
