import { axiosInstance } from '@/shared/api';

import { User } from './types';

export const userApi = {
  getCurrentUser: async (accessToken?: string): Promise<User | null> => {
    try {
      let headers = {};
      if (accessToken) {
        headers = { Authorization: `Bearer ${accessToken}` };
      }
      const res = await axiosInstance.post<User>('/auth', null, { headers });
      return res.data;
    } catch {
      throw new Error('Failed to fetch current user');
    }
  },
};
