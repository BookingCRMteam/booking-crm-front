import { useQuery } from '@tanstack/react-query';

import { getBookingExpiration } from '../api/bookingApi';

export const useGetBookingExpirationQuery = (bookingId: number) => {
  return useQuery({
    queryKey: ['booking-expiration', bookingId],
    queryFn: () => getBookingExpiration(bookingId),
    refetchOnWindowFocus: true,
    staleTime: 30000,
    retry: 1,
  });
};
