import {
  BookingPaymentResponse,
  BookingRequest,
  BookingResponse,
} from '@/entities/booking';

import { axiosInstance, handleApiError } from '@/shared/api';
import { APP_ROUTE, DYNAMIC_ROUTE } from '@/shared/constants/routes';

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

export const getBookingById = async (
  tourId: number,
  bookingId: number,
): Promise<BookingPaymentResponse> => {
  try {
    const { data: res } = await axiosInstance.get<BookingPaymentResponse>(
      `${DYNAMIC_ROUTE.BOOKING_BY_ID(tourId, bookingId)}`,
    );
    return res;
  } catch (error: unknown) {
    handleApiError(error);
  }
};
