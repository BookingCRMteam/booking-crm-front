import { getAccessToken } from '@auth0/nextjs-auth0';

import {
  BookingExpirationResponse,
  BookingPaymentResponse,
  BookingRequest,
  BookingResponse,
} from '@/entities/booking';

import { axiosInstance, handleApiError } from '@/shared/api';
import { APP_ROUTE, DYNAMIC_ROUTE } from '@/shared/constants/routes';

import {
  GetUserBookingsQueryProps,
  RepayLink,
  UserBooking,
} from '../model/type';

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

export const createRepayLink = async (id: number): Promise<RepayLink> => {
  try {
    const { data: res } = await axiosInstance.post<RepayLink>(
      DYNAMIC_ROUTE.BOOKING_REPAY(id),
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
      DYNAMIC_ROUTE.BOOKING_BY_ID(tourId, bookingId),
    );
    return res;
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const getUserBookings = async ({
  status,
  limit = 6,
  offset = 0,
}: GetUserBookingsQueryProps): Promise<UserBooking[]> => {
  try {
    const token = await getAccessToken();
    const { data: res } = await axiosInstance.get<UserBooking[]>(
      APP_ROUTE.USER_BOOKINGS,
      {
        params: { status, limit, offset },
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res;
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const getUserBookingById = async (
  bookingId: number,
  accessToken: string,
): Promise<UserBooking> => {
  try {
    const { data: res } = await axiosInstance.get<UserBooking>(
      DYNAMIC_ROUTE.USER_BOOKING_BY_ID(bookingId),
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return res;
  } catch (error: unknown) {
    handleApiError(error);
  }
};

export const getBookingExpiration = async (
  bookingId: number,
): Promise<BookingExpirationResponse> => {
  try {
    const { data: res } = await axiosInstance.get<BookingExpirationResponse>(
      DYNAMIC_ROUTE.BOOKING_EXPIRATION(bookingId),
    );
    return res;
  } catch (error: unknown) {
    handleApiError(error);
  }
};
