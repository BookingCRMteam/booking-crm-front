import { apiClient } from './apiClient';

export type Operator = {
  id: number;
};

export interface OperatorOnboarding {
  // companyName: string;
  // description: string;
  firstName: string;
  lastName: string;
  email: string;
  website: string;
  phone: string;
}

export interface ApiErrorResponse {
  message: string | string[];
  statusCode?: number;
  error?: string;
}

export const operatorApi = {
  setNewOperator: async (body: OperatorOnboarding): Promise<Operator> => {
    try {
      const res = await apiClient.patch<Operator>('/operator', body);
      return res.data;
    } catch (err: unknown) {
      //TODO: оптимізувати обробку помилки
      if (typeof err === 'object' && err !== null && 'response' in err) {
        const axiosErr = err as {
          response?: { data?: ApiErrorResponse };
          message?: string;
        };

        const msg = axiosErr.response?.data?.message;
        if (msg) {
          throw new Error(Array.isArray(msg) ? msg.join(', ') : msg);
        }

        throw new Error(axiosErr.message || 'Unknown error');
      }

      throw new Error('Unknown error');
    }
  },
};
