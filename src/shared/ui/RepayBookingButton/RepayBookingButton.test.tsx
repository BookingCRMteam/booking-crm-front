import { fireEvent, screen, waitFor } from '@testing-library/react';

import { submitLiqpayForm } from '@/features/booking/utils/submitLiqpayForm';

import { createRepayLink } from '@/entities/booking';

import { useNotificationStore } from '@/shared/store/notificationSlice';
import { renderWithTheme } from '@/shared/tests';

import { RepayBookingButton } from './RepayBookingButton';

jest.mock('@/entities/booking', () => ({
  createRepayLink: jest.fn(),
}));

jest.mock('@/features/booking/utils/submitLiqpayForm', () => ({
  submitLiqpayForm: jest.fn(),
}));

jest.mock('@/shared/store/notificationSlice', () => ({
  useNotificationStore: jest.fn(),
}));

describe('RepayBookingButton Component', () => {
  const mockBookingId = 789;
  const mockShowNotification = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNotificationStore as unknown as jest.Mock).mockReturnValue({
      showNotification: mockShowNotification,
    });
  });

  it('should render with default title', () => {
    renderWithTheme(<RepayBookingButton bookingId={mockBookingId} />);
    expect(screen.getByText('Продовжити оплату')).toBeInTheDocument();
  });

  it('should render with custom title', () => {
    renderWithTheme(
      <RepayBookingButton
        bookingId={mockBookingId}
        buttonTitle="Оплатити зараз"
      />,
    );
    expect(screen.getByText('Оплатити зараз')).toBeInTheDocument();
  });

  it('should handle successful payment flow', async () => {
    const mockPaymentLink = 'https://liqpay.ua/checkout/test';
    (createRepayLink as jest.Mock).mockResolvedValue({
      paymentLink: mockPaymentLink,
    });

    const { getByRole } = renderWithTheme(
      <RepayBookingButton bookingId={mockBookingId} />,
    );

    const button = getByRole('button');
    fireEvent.click(button);

    expect(button).toBeDisabled();

    await waitFor(() => {
      expect(createRepayLink).toHaveBeenCalledWith(mockBookingId);
      expect(submitLiqpayForm).toHaveBeenCalledWith(mockPaymentLink);
    });

    expect(button).not.toBeDisabled();
  });

  it('should show notification on error', async () => {
    const errorText = 'API Error';
    (createRepayLink as jest.Mock).mockRejectedValue(errorText);

    const { getByRole, user } = renderWithTheme(
      <RepayBookingButton bookingId={mockBookingId} />,
    );

    await user.click(getByRole('button'));

    await waitFor(() => {
      expect(mockShowNotification).toHaveBeenCalledWith(errorText, 'error');
    });

    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('should pass extra MUI props to the button', () => {
    renderWithTheme(
      <RepayBookingButton
        bookingId={mockBookingId}
        color="secondary"
        size="small"
      />,
    );
    const button = screen.getByRole('button');

    expect(button).toHaveClass('MuiButton-containedSecondary');
    expect(button).toHaveClass('MuiButton-sizeSmall');
  });
});
