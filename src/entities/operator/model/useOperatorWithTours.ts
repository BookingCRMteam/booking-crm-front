import { useQuery } from '@tanstack/react-query';

import { operatorApi } from '../api/operatorApi';
import { OperatorById } from '../api/types';

export const useOperatorWithTours = (id?: string) => {
  const operatorQuery = useQuery<OperatorById, Error>({
    queryKey: ['operator', id],
    queryFn: () => operatorApi.getOperatorById(id as string),
    staleTime: 1000 * 60 * 60,
    enabled: !!id,
  });

  return {
    operator: operatorQuery.data,
    isLoading: operatorQuery.isLoading,
    isError: operatorQuery.isError,
    error: operatorQuery.error,
  };
};
