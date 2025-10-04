'use client';

import { type FC, useCallback, useEffect } from 'react';

import {
  AxiosHeaders,
  type InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';

import { axiosInstance } from '@/shared/api';
import { useAccessTokenStore } from '@/shared/session';
import type { ProviderProps } from '@/shared/types';

const applyAuthHeader = (
  config: InternalAxiosRequestConfig,
  token: string,
): void => {
  if (!config.headers) {
    config.headers = new AxiosHeaders();
  }

  if (config.headers instanceof AxiosHeaders) {
    config.headers.set('Authorization', `Bearer ${token}`);
  } else {
    (config.headers as Record<string, string>)['Authorization'] =
      `Bearer ${token}`;
  }
};

const redirectToLogin = (clearAuth: () => void): void => {
  clearAuth();
  if (typeof window !== 'undefined') {
    const { pathname, search } = window.location;
    if (pathname.startsWith('/auth')) return;
    const returnTo = pathname + search;
    window.location.href = `/auth/login?returnTo=${encodeURIComponent(returnTo)}`;
  }
};

export const ApiClientProvider: FC<ProviderProps> = ({ children }) => {
  const refreshAccessToken = useAccessTokenStore((s) => s.refreshAccessToken);
  const clearAuth = useAccessTokenStore((s) => s.clearAuth);
  const tokenInStore = useAccessTokenStore((s) => s.accessToken);

  const handleResponseError = useCallback(
    async (error: unknown) => {
      if (!isAxiosError(error)) {
        return Promise.reject(error);
      }

      const status = error.response?.status;
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        __retry?: boolean;
      };

      if (status === 401) {
        if (!originalRequest.__retry) {
          originalRequest.__retry = true;
          try {
            const newToken = await refreshAccessToken();
            if (newToken) {
              applyAuthHeader(originalRequest, newToken);
              return axiosInstance(originalRequest);
            }
          } catch (e) {
            console.error('[Auth] Failed to refresh token', e);
          }
          redirectToLogin(clearAuth);
        } else {
          // Second 401 after retry
          redirectToLogin(clearAuth);
        }
      }

      return Promise.reject(error);
    },
    [refreshAccessToken, clearAuth],
  );

  useEffect(() => {
    const reqId = axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        if (tokenInStore) {
          applyAuthHeader(config, tokenInStore);
        }
        return config;
      },
    );

    const resId = axiosInstance.interceptors.response.use(
      (r) => r,
      handleResponseError,
    );

    return () => {
      axiosInstance.interceptors.request.eject(reqId);
      axiosInstance.interceptors.response.eject(resId);
    };
  }, [tokenInStore, handleResponseError]);

  return <>{children}</>;
};
