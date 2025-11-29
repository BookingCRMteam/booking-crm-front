import { useQuery } from '@tanstack/react-query';

import { operatorApi } from '../api/operatorApi';
import type { OperatorBooking } from '../api/types';

export const useGetOperatorBookingsQuery = () => {
  return useQuery<OperatorBooking[]>({
    queryKey: ['operator', 'bookings'],
    queryFn: async () => {
      return operatorApi.getOperatorBookings();
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
