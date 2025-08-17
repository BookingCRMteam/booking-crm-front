'use client';

import { ReactNode, useEffect } from 'react';

import type { InternalAxiosRequestConfig } from 'axios';
import { AxiosHeaders } from 'axios';

import { apiClient } from '@/shared/api/apiClient';
import { useUserStore } from '@/shared/providers/UserStoreProvider';

type Props = { children: ReactNode };

export default function ApiClientProvider({ children }: Props) {
  const ensureAccessToken = useUserStore((s) => s.ensureAccessToken);
  const refreshAccessToken = useUserStore((s) => s.refreshAccessToken);
  const clearAuth = useUserStore((s) => s.clearAuth);
  const tokenInStore = useUserStore((s) => s.accessToken);

  useEffect(() => {
    const reqId = apiClient.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        let token = tokenInStore;
        if (!token) token = await ensureAccessToken();
        if (token) {
          // забезпечуємо, що headers — це AxiosHeaders
          if (!config.headers) {
            config.headers = new AxiosHeaders();
          }
          if (config.headers instanceof AxiosHeaders) {
            config.headers.set('Authorization', `Bearer ${token}`);
          } else {
            // fallback на випадок старих сигнатур
            (config.headers as Record<string, string>)['Authorization'] =
              `Bearer ${token}`;
          }
        }
        return config;
      },
    );

    const resId = apiClient.interceptors.response.use(
      (r) => r,
      async (error) => {
        const status = error?.response?.status;
        const original: InternalAxiosRequestConfig & { __retry?: boolean } =
          error?.config || {};

        if (status === 401 && !original.__retry) {
          original.__retry = true;
          try {
            const newToken = await refreshAccessToken();
            if (newToken) {
              if (!original.headers) {
                original.headers = new AxiosHeaders();
              }
              if (original.headers instanceof AxiosHeaders) {
                original.headers.set('Authorization', `Bearer ${newToken}`);
              } else {
                (original.headers as Record<string, string>)['Authorization'] =
                  `Bearer ${newToken}`;
              }
              return apiClient(original);
            }
          } catch (e) {
            console.error(e);
          }
          clearAuth();
          if (typeof window !== 'undefined') {
            const returnTo = window.location.pathname + window.location.search;
            window.location.href = `/auth/login?returnTo=${encodeURIComponent(returnTo)}`;
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      apiClient.interceptors.request.eject(reqId);
      apiClient.interceptors.response.eject(resId);
    };
  }, [ensureAccessToken, refreshAccessToken, clearAuth, tokenInStore]);

  return <>{children}</>;
}
