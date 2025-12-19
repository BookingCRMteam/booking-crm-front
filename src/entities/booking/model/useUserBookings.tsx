import { useQuery } from '@tanstack/react-query';

import { getUserBookings } from '../api/bookingApi';
import { GetUserBookingsQueryProps, UserBooking } from '../model/type';

export const useUserBookingsQuery = ({
  status,
  limit = 6,
  offset = 0,
}: GetUserBookingsQueryProps) => {
  return useQuery<UserBooking[]>({
    queryKey: ['user', 'bookings', status],
    queryFn: () => getUserBookings({ status, limit, offset }),
    staleTime: 1000 * 60 * 15, // 15 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
