import { axiosInstance, handleApiError } from '@/shared/api';
import { APP_ROUTE } from '@/shared/constants/routes';

import { BookingRequest, BookingResponse } from '../model/type';

export const createBooking = async (
  data: BookingRequest,
): Promise<BookingResponse> => {
  try {
    const { data: res } = await axiosInstance.post<BookingResponse>(
      APP_ROUTE.BOOKINGS,
      data,
    );
    return res;
  } catch (error: unknown) {
    handleApiError(error);
  }
};
