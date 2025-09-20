import { axiosInstance } from '@/shared/api';
import { handleApiError } from '@/shared/api';

import { Operator, OperatorMe, OperatorOnboarding } from './types';

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
  getOperatorMe: async (accessToken?: string): Promise<OperatorMe | null> => {
    try {
      let headers = {};
      if (accessToken) {
        headers = { Authorization: `Bearer ${accessToken}` };
      }
      const res = await axiosInstance.get<OperatorMe>('/operator/me', {
        headers,
      });
      return res.data;
    } catch (e: unknown) {
      handleApiError(e);
    }
  },
};
