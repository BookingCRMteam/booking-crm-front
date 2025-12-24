import { screen } from '@testing-library/react';

import { renderWithTheme } from '@/shared/tests';

import { TourCardBookingActions } from './TourCardBookingActions';

jest.mock('../../BookingButton/BookingButton', () => ({
  BookingButton: ({ bookingId }: { bookingId: number }) => (
    <div data-testid="booking-button">Confirmed: {bookingId}</div>
  ),
}));

jest.mock('@/shared/ui', () => ({
  RepayBookingButton: ({ bookingId }: { bookingId: number }) => (
    <div data-testid="repay-button">Repay: {bookingId}</div>
  ),
}));

describe('TourCardBookingActions Component', () => {
  const mockBookingId = 777;

  it('should render BookingButton when status is "confirmed"', () => {
    renderWithTheme(
      <TourCardBookingActions
        bookingStatus="confirmed"
        bookingId={mockBookingId}
      />,
    );

    expect(screen.getByTestId('booking-button')).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(String(mockBookingId))),
    ).toBeInTheDocument();

    expect(screen.queryByTestId('repay-button')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /скасовано/i }),
    ).not.toBeInTheDocument();
  });

  it('should render RepayBookingButton when status is "pending_payment"', () => {
    renderWithTheme(
      <TourCardBookingActions
        bookingStatus="pending_payment"
        bookingId={mockBookingId}
      />,
    );

    expect(screen.getByTestId('repay-button')).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(String(mockBookingId))),
    ).toBeInTheDocument();

    expect(screen.queryByTestId('booking-button')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /скасовано/i }),
    ).not.toBeInTheDocument();
  });

  it('should render a disabled button with text "Скасовано" when status is "expired"', () => {
    renderWithTheme(
      <TourCardBookingActions
        bookingStatus="expired"
        bookingId={mockBookingId}
      />,
    );

    const expiredButton = screen.getByRole('button', { name: /скасовано/i });

    expect(expiredButton).toBeInTheDocument();
    expect(expiredButton).toBeDisabled();

    expect(screen.queryByTestId('booking-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('repay-button')).not.toBeInTheDocument();
  });
});
