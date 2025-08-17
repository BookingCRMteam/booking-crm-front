import { User } from '../types/user';
import { apiClient } from './apiClient';

export const userApi = {
  getCurrentUser: async (accessToken: string): Promise<User> => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const res = await apiClient.post<User>('/auth', null, { headers });
    return res.data;
  },
};
