import { axiosInstance } from '@/shared/api/axiosInstance';

export const getStatusApi = async (): Promise<string> => {
  const res = await axiosInstance.get<string>('/health');
  return res.data;
};
