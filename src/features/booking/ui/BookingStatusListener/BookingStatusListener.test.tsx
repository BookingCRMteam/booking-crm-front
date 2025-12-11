import { useRouter, useSearchParams } from 'next/navigation';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getBookingById } from '@/entities/booking';

import { logger } from '@/shared/lib/logger';

import { BookingStatusListener } from './BookingStatusListener';

jest.mock('@/entities/booking', () => ({
  getBookingById: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ replace: jest.fn() })),
  useSearchParams: jest.fn(),
}));

jest.mock('@/shared/lib/logger', () => ({
  logger: { error: jest.fn() },
}));

jest.mock('../PaymentModal/PaymentModal', () => ({
  PaymentModal: jest.fn(({ data, onClose }) => (
    <div data-testid="payment-modal">
      <span>{data?.status}</span>
      <button onClick={onClose}>Close</button>
    </div>
  )),
}));

const user = userEvent.setup();

describe('BookingStatusListener', () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });
  });

  it('does nothing if no bookingId in search params', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => null,
    });

    render(<BookingStatusListener tourId={1} />);

    expect(getBookingById).not.toHaveBeenCalled();
    expect(screen.queryByTestId('payment-modal')).toBeNull();
  });

  it('fetches booking and shows modal if bookingId exists', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => (key === 'bookingId' ? '42' : null),
    });

    const mockData = { id: 42, status: 'confirmed' };
    (getBookingById as jest.Mock).mockResolvedValue(mockData);

    render(<BookingStatusListener tourId={1} />);

    await waitFor(() => expect(getBookingById).toHaveBeenCalledWith(1, 42));
    await waitFor(() =>
      expect(screen.getByTestId('payment-modal')).toBeInTheDocument(),
    );

    expect(screen.getByText('confirmed')).toBeInTheDocument();
    expect(mockReplace).toHaveBeenCalled();
  });

  it('logs error if fetch fails', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => (key === 'bookingId' ? '42' : null),
    });

    const error = new Error('Failed fetch');
    (getBookingById as jest.Mock).mockRejectedValue(error);

    render(<BookingStatusListener tourId={1} />);

    await waitFor(() =>
      expect(logger.error).toHaveBeenCalledWith(
        'Failed to fetch booking data:',
        error,
      ),
    );
    expect(screen.queryByTestId('payment-modal')).toBeNull();
  });

  it('closes modal on close button click', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => (key === 'bookingId' ? '42' : null),
    });

    const mockData = { id: 42, status: 'confirmed' };
    (getBookingById as jest.Mock).mockResolvedValue(mockData);

    render(<BookingStatusListener tourId={1} />);

    await waitFor(() =>
      expect(screen.getByTestId('payment-modal')).toBeInTheDocument(),
    );

    user.click(screen.getByText('Close'));

    await waitFor(() =>
      expect(screen.queryByTestId('payment-modal')).toBeNull(),
    );
  });
});
