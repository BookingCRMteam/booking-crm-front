import { httpClient } from '@/shared/api/httpClient';

export const getStatusApi = async (): Promise<string> => {
  return httpClient.get<string>('/health');
};
