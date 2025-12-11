import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BookingPaymentResponse } from '@/entities/booking';

import { mockPaidBooking } from '@/shared/tests';

import { PaymentModal } from './PaymentModal';

jest.mock('../PaymentSuccess/PaymentSuccess', () => ({
  PaymentSuccess: jest.fn(() => <div data-testid="payment-success" />),
}));

jest.mock('../PaymentFailed/PaymentFailed', () => ({
  PaymentFailed: jest.fn(() => <div data-testid="payment-failed" />),
}));

jest.mock('@/shared/ui', () => ({
  CloseButton: ({ onClick }: { onClick: () => void }) => (
    <button data-testid="close-button" onClick={onClick}>
      Close
    </button>
  ),
}));

const user = userEvent.setup();

const mockPendingBooking: BookingPaymentResponse = {
  ...mockPaidBooking,
  status: 'pending_payment',
};

describe('PaymentModal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders PaymentSuccess when status is confirmed', () => {
    render(<PaymentModal data={mockPaidBooking} onClose={onClose} />);
    expect(screen.getByTestId('payment-success')).toBeInTheDocument();
    expect(screen.queryByTestId('payment-failed')).toBeNull();
  });

  it('renders PaymentFailed when status is pending_payment', () => {
    render(<PaymentModal data={mockPendingBooking} onClose={onClose} />);
    expect(screen.getByTestId('payment-failed')).toBeInTheDocument();
    expect(screen.queryByTestId('payment-success')).toBeNull();
  });

  it('calls onClose when CloseButton is clicked', async () => {
    render(<PaymentModal data={mockPaidBooking} onClose={onClose} />);
    await user.click(screen.getByTestId('close-button'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('modal has correct maxWidth for confirmed and pending_payment', () => {
    const { rerender } = render(
      <PaymentModal data={mockPaidBooking} onClose={onClose} />,
    );
    const modalContent = screen.getByRole('dialog');
    expect(modalContent).toHaveStyle('max-width: 592px');

    rerender(<PaymentModal data={mockPendingBooking} onClose={onClose} />);
    expect(modalContent).toHaveStyle('max-width: 457px');
  });
});
