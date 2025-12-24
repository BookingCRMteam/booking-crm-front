import { screen } from '@testing-library/react';

import { renderWithTheme } from '@/shared/tests';

import { TourBookingControl } from './TourBookingControl';

const BOOKING_STATUS_LABELS = {
  confirmed: 'Заброньовано',
  expired: 'Скасовано',
};

jest.mock('@/shared/ui', () => ({
  RepayBookingButton: ({ bookingId }: { bookingId: number }) => (
    <div data-testid="repay-button">Repay ID: {bookingId}</div>
  ),
}));

jest.mock('../BookingLabel/BookingLabel', () => ({
  BookingLabel: ({ label }: { label: string }) => (
    <div data-testid="booking-label">{label}</div>
  ),
}));

describe('TourBookingControl Component', () => {
  const mockBookingId = 123;

  it('should render RepayBookingButton when status is "pending_payment"', () => {
    renderWithTheme(
      <TourBookingControl
        bookingStatus="pending_payment"
        bookingId={mockBookingId}
      />,
    );

    expect(screen.getByTestId('repay-button')).toBeInTheDocument();
    expect(screen.getByText(`Repay ID: ${mockBookingId}`)).toBeInTheDocument();

    expect(screen.queryByTestId('booking-label')).not.toBeInTheDocument();
  });

  it('should render BookingLabel with "Заброньовано" when status is "confirmed"', () => {
    renderWithTheme(
      <TourBookingControl
        bookingStatus="confirmed"
        bookingId={mockBookingId}
      />,
    );

    const label = screen.getByTestId('booking-label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent(BOOKING_STATUS_LABELS.confirmed);

    expect(screen.queryByTestId('repay-button')).not.toBeInTheDocument();
  });

  it('should render BookingLabel with "Скасовано" when status is "expired"', () => {
    renderWithTheme(
      <TourBookingControl bookingStatus="expired" bookingId={mockBookingId} />,
    );

    const label = screen.getByTestId('booking-label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent(BOOKING_STATUS_LABELS.expired);

    expect(screen.queryByTestId('repay-button')).not.toBeInTheDocument();
  });
});
