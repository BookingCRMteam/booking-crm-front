import { render } from '@testing-library/react';

import { useModalStore } from '@/features/modal';

import { useUserBookingsQuery } from '@/entities/booking';

import { useNotificationStore } from '@/shared/store';
import { mockUserTraveler } from '@/shared/tests';

import { PaymentReminderListener } from './PaymentReminderListener';

jest.mock('@/features/modal');
jest.mock('@/entities/booking');
jest.mock('@/shared/store', () => ({
  useNotificationStore: jest.fn(),
}));

describe('PaymentReminderListener', () => {
  const mockOpenModal = jest.fn();
  const mockShowNotification = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();

    (useModalStore as unknown as jest.Mock).mockReturnValue({
      open: false,
      openModal: mockOpenModal,
    });
    (useNotificationStore as unknown as jest.Mock).mockReturnValue({
      showNotification: mockShowNotification,
    });
  });

  it('should not open modal if there are no pending bookings', () => {
    (useUserBookingsQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(<PaymentReminderListener user={mockUserTraveler} />);

    expect(mockOpenModal).not.toHaveBeenCalled();
  });

  it('should open modal and set sessionStorage if booking exists and not dismissed', () => {
    const mockBooking = { bookingId: 123 };
    (useUserBookingsQuery as jest.Mock).mockReturnValue({
      data: [mockBooking],
      isLoading: false,
    });

    render(<PaymentReminderListener user={mockUserTraveler} />);

    expect(mockOpenModal).toHaveBeenCalledWith({
      type: 'payment-reminder-modal',
      payload: { bookingId: mockBooking.bookingId },
      dismissible: true,
    });

    expect(sessionStorage.getItem('payment_reminder_dismissed')).toBe('true');
  });

  it('should not open modal if it was already dismissed in this session', () => {
    sessionStorage.setItem('payment_reminder_dismissed', 'true');
    (useUserBookingsQuery as jest.Mock).mockReturnValue({
      data: [{ bookingId: 123 }],
      isLoading: false,
    });

    render(<PaymentReminderListener user={mockUserTraveler} />);

    expect(mockOpenModal).not.toHaveBeenCalled();
  });

  it('should not open modal if another modal is already open', () => {
    (useModalStore as unknown as jest.Mock).mockReturnValue({
      open: true,
      openModal: mockOpenModal,
    });
    (useUserBookingsQuery as jest.Mock).mockReturnValue({
      data: [{ bookingId: 123 }],
      isLoading: false,
    });

    render(<PaymentReminderListener user={mockUserTraveler} />);

    expect(mockOpenModal).not.toHaveBeenCalled();
  });

  it('should show notification if openModal throws an error', () => {
    const error = { message: 'Modal error' };
    mockOpenModal.mockImplementation(() => {
      throw error;
    });

    (useUserBookingsQuery as jest.Mock).mockReturnValue({
      data: [{ bookingId: 123 }],
      isLoading: false,
    });

    render(<PaymentReminderListener user={mockUserTraveler} />);

    expect(mockShowNotification).toHaveBeenCalledWith(error.message, 'error');
  });
});
