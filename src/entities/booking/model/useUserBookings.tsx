import { useQuery } from '@tanstack/react-query';

import { getUserBookings } from '../api/bookingApi';
import { UserBooking } from '../model/type';

export const useUserBookingsQuery = () => {
  return useQuery<UserBooking[]>({
    queryKey: ['user', 'bookings'],
    queryFn: async () => {
      return getUserBookings();
    },
    staleTime: 1000 * 60 * 60 * 24,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
