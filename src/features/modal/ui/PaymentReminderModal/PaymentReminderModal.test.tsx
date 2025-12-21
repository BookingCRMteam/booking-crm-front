import { ThemeProvider, createTheme } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';

import { PaymentReminderModal } from './PaymentReminderModal';

jest.mock('./constants', () => ({
  MODAL_PAYMENT_REMINDER_TITLE: 'Нагадування про оплату',
  MODAL_PAYMENT_REMINDER_DESCRIPTION: [
    { text: 'Перший рядок' },
    { text: 'Другий рядок' },
    { text: 'Третій рядок' },
  ],
}));

jest.mock('@/shared/ui', () => ({
  BookingTimer: jest.fn(({ bookingId, variant }) => (
    <div data-testid="mock-timer" data-id={bookingId} data-variant={variant}>
      Timer {bookingId}
    </div>
  )),
  RepayBookingButton: jest.fn(({ bookingId }) => (
    <button data-testid="mock-repay-button">Pay {bookingId}</button>
  )),
}));

jest.mock('../ModalWrapper', () => ({
  ModalWrapper: ({
    children,
    title,
  }: {
    children: React.ReactNode;
    title: string;
  }) => (
    <div data-testid="modal-wrapper">
      <h1>{title}</h1>
      {children}
    </div>
  ),
}));

const theme = createTheme();

describe('PaymentReminderModal', () => {
  const mockBookingId = 555;

  it('should render all parts of the description and child components', () => {
    render(
      <ThemeProvider theme={theme}>
        <PaymentReminderModal bookingId={mockBookingId} />
      </ThemeProvider>,
    );

    expect(screen.getByText('Нагадування про оплату')).toBeInTheDocument();

    expect(screen.getByText('Перший рядок')).toBeInTheDocument();
    expect(screen.getByText('Другий рядок')).toBeInTheDocument();
    expect(screen.getByText('Третій рядок')).toBeInTheDocument();

    const timer = screen.getByTestId('mock-timer');
    expect(timer).toHaveAttribute('data-id', mockBookingId.toString());
    expect(timer).toHaveAttribute('data-variant', 'modal');
    const button = screen.getByTestId('mock-repay-button');
    expect(button).toBeInTheDocument();
    expect(button.textContent).toContain(mockBookingId.toString());
  });
});
