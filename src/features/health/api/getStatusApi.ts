import { apiClient } from '@/shared/api/apiClient';

export const getStatusApi = async (): Promise<string> => {
  const res = await apiClient.get<string>('/health');
  return res.data;
};
