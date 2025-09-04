import { User } from '../types/user';
import { axiosInstance } from './axiosInstance';

export const userApi = {
  getCurrentUser: async (accessToken: string): Promise<User> => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const res = await axiosInstance.post<User>('/auth', null, { headers });
    return res.data;
  },
};
