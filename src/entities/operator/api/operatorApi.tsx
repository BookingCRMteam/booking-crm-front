import { isAxiosError } from 'axios';

import { axiosInstance, handleApiError } from '@/shared/api';

import {
  Operator,
  OperatorById,
  OperatorMe,
  OperatorOnboarding,
} from './types';

export const operatorApi = {
  setNewOperator: async (body: OperatorOnboarding): Promise<Operator> => {
    try {
      const res = await axiosInstance.post<Operator>('/operator', body);
      return res.data;
    } catch (e: unknown) {
      handleApiError(e);
    }
  },
  setPublicData: async (body: FormData): Promise<OperatorMe> => {
    try {
      const res = await axiosInstance.patch<OperatorMe>('/operator', body);
      return res.data;
    } catch (e: unknown) {
      handleApiError(e);
    }
  },
  deleteMyPhoto: async (): Promise<OperatorMe> => {
    try {
      const res = await axiosInstance.delete<OperatorMe>('/operator/me/photo');
      return res.data;
    } catch (e: unknown) {
      handleApiError(e);
    }
  },
  getOperatorMe: async (accessToken?: string): Promise<OperatorMe | null> => {
    try {
      const res = await axiosInstance.get<OperatorMe>('/operator/me', {
        headers: accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : undefined,
      });
      return res.data;
    } catch (e: unknown) {
      if (isAxiosError(e) && e.response?.status === 401) {
        return null;
      }
      handleApiError(e);
    }
  },
  getOperatorById: async (id: number): Promise<OperatorById> => {
    try {
      const res = await axiosInstance.get<OperatorById>(`/operator/${id}`);
      return res.data;
    } catch (e: unknown) {
      handleApiError(e);
    }
  },
};
