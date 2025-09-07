import { isAxiosError } from 'axios';

import { axiosInstance } from './axiosInstance';

export type Operator = {
  id: number;
  message: string;
};

export type OperatorOnboarding = {
  firstName: string;
  lastName: string;
  website: string;
  phone: string;
};

export class ApiError extends Error {
  statusCode?: number;
  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

export const operatorApi = {
  setNewOperator: async (body: OperatorOnboarding): Promise<Operator> => {
    try {
      const res = await axiosInstance.post<Operator>('/operator', body);
      return res.data;
    } catch (err: unknown) {
      //TODO: оптимізувати обробку помилки
      if (isAxiosError(err)) {
        const msg = err.response?.data?.message;
        const status =
          err.response?.data?.statusCode ?? err.response?.status ?? undefined;
        const message =
          (Array.isArray(msg) ? msg.join(', ') : msg) ||
          err.message ||
          'Unknown error';
        throw new ApiError(message, status);
      }
      throw new ApiError('Unknown error');
    }
  },
  setPublicData: async (body: FormData): Promise<Operator> => {
    try {
      const res = await axiosInstance.patch<Operator>('/operator', body);
      return res.data;
    } catch (err: unknown) {
      //TODO: оптимізувати обробку помилки
      if (isAxiosError(err)) {
        const msg = err.response?.data?.message;
        const status =
          err.response?.data?.statusCode ?? err.response?.status ?? undefined;
        const message =
          (Array.isArray(msg) ? msg.join(', ') : msg) ||
          err.message ||
          'Unknown error';
        throw new ApiError(message, status);
      }
      throw new ApiError('Unknown error');
    }
  },
};
