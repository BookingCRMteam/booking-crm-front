import { isAxiosError } from 'axios';

import { axiosInstance, handleApiError } from '@/shared/api';

import {
  OperatorMe,
  OperatorOnboarding,
  OperatorPaidBooking,
  OperatorPopular,
} from './types';

export const operatorApi = {
  setNewOperator: async (body: OperatorOnboarding): Promise<OperatorMe> => {
    try {
      const res = await axiosInstance.post<OperatorMe>('/operator', body);
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
  getOperatorById: async (id: number): Promise<OperatorMe> => {
    try {
      const res = await axiosInstance.get<OperatorMe>(`/operator/${id}`);
      return res.data;
    } catch (e: unknown) {
      handleApiError(e);
    }
  },
  getOperatorsPopular: async (limit: number): Promise<OperatorPopular[]> => {
    try {
      const res = await axiosInstance.get<OperatorPopular[]>(
        `/operator/popular`,
        { params: { limit } },
      );
      return res.data;
    } catch (e: unknown) {
      handleApiError(e);
    }
  },
  getOperatorBookings: async (): Promise<OperatorPaidBooking[]> => {
    try {
      const res =
        await axiosInstance.get<OperatorPaidBooking[]>(`/operator-bookings`);
      return res.data;
    } catch (e: unknown) {
      handleApiError(e);
    }
  },
};
