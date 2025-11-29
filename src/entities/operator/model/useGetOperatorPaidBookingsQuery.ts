import { useQuery } from '@tanstack/react-query';

import { operatorApi } from '../api/operatorApi';
import type { OperatorPaidBooking } from '../api/types';

export const useGetOperatorPaidBookingsQuery = () => {
  return useQuery<OperatorPaidBooking[]>({
    queryKey: ['operator', 'bookings'],
    queryFn: operatorApi.getOperatorBookings,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
