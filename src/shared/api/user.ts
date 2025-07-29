import { User } from '../types/user';
import { httpClient } from './httpClient';

export const userApi = {
  getCurrentUser: async (token: string): Promise<User> => {
    return httpClient.post<User>('/auth', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
