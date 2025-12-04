import { act, renderHook } from '@testing-library/react';

import { BookingRequest, createBooking } from '@/entities/booking';

import { ApiError } from '@/shared/api/handleApiError';
import { useBookingStore, useNotificationStore } from '@/shared/store';

import { handleBookingError } from '../utils/handleBookingError';
import { submitLiqpayForm } from '../utils/submitLiqpayForm';
import { useCreateBooking } from './useCreateBooking';

jest.mock('@/entities/booking', () => ({
  createBooking: jest.fn(),
}));

jest.mock('@/shared/store', () => ({
  useBookingStore: jest.fn(),
  useNotificationStore: jest.fn(),
}));

jest.mock('@auth0/nextjs-auth0', () => ({
  useUser: () => ({
    user: null,
    error: null,
    isLoading: false,
  }),
}));

jest.mock('../utils/handleBookingError', () => ({
  handleBookingError: jest.fn(),
}));

jest.mock('../utils/submitLiqpayForm', () => ({
  submitLiqpayForm: jest.fn(),
}));

const mockData: BookingRequest = {
  userId: 11,
  tourId: 456,
  firstPersonName: 'Олена',
  firstPersonSurname: 'Петренко',
  secondPersonName: 'Іван',
  secondPersonSurname: 'Іванов',
  phone: '+380501122333',
  numberOfPeople: 2,
  paymentProvider: 'liqpay',
} as BookingRequest;

describe('useCreateBooking', () => {
  const mockCloseBookingModal = jest.fn();
  const mockShowNotification = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useBookingStore as unknown as jest.Mock).mockReturnValue({
      closeBookingModal: mockCloseBookingModal,
    });

    (useNotificationStore as unknown as jest.Mock).mockReturnValue({
      showNotification: mockShowNotification,
    });
  });

  it('calls createBooking and redirects via LiqPay on success', async () => {
    const mockBooking = {
      paymentLink: 'https://liqpay.ua/pay',
    };

    (createBooking as jest.Mock).mockResolvedValue(mockBooking);

    const { result } = renderHook(() => useCreateBooking());

    await act(async () => {
      await result.current.createAndRedirect(mockData);
    });

    expect(createBooking).toHaveBeenCalledWith(mockData);
    expect(submitLiqpayForm).toHaveBeenCalledWith(mockBooking.paymentLink);
    expect(mockShowNotification).not.toHaveBeenCalled();
    expect(mockCloseBookingModal).not.toHaveBeenCalled();
  });

  it('handles error correctly', async () => {
    const mockError = new Error('Booking failed') as ApiError;
    const mockMessage = 'Something went wrong';

    (createBooking as jest.Mock).mockRejectedValue(mockError);
    (handleBookingError as jest.Mock).mockReturnValue(mockMessage);

    const { result } = renderHook(() => useCreateBooking());

    await act(async () => {
      await result.current.createAndRedirect(mockData);
    });

    expect(createBooking).toHaveBeenCalledWith(mockData);
    expect(handleBookingError).toHaveBeenCalledWith(mockError);
    expect(mockShowNotification).toHaveBeenCalledWith(mockMessage, 'error');
    expect(mockCloseBookingModal).toHaveBeenCalled();
    expect(submitLiqpayForm).not.toHaveBeenCalled();
  });
});
