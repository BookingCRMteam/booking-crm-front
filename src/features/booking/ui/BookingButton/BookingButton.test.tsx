import { fireEvent, screen } from '@testing-library/react';

import { renderWithTheme } from '@/shared/tests/renderWithProviders';

import { BookingButton } from './BookingButton';

jest.mock('../BookingAuthPopover/BookingAuthPopover', () => ({
  BookingAuthPopover: ({
    anchorEl,
  }: {
    anchorEl: HTMLButtonElement | null;
  }) => <div data-testid="auth-popover">{anchorEl ? 'open' : 'closed'}</div>,
}));

jest.mock('../BookingOperatorPopover/BookingOperatorPopover', () => ({
  BookingOperatorPopover: ({
    anchorEl,
  }: {
    anchorEl: HTMLButtonElement | null;
  }) => (
    <div data-testid="operator-popover">{anchorEl ? 'open' : 'closed'}</div>
  ),
}));

jest.mock('../BookingModal/BookingModal', () => ({
  BookingModal: () => <div data-testid="booking-modal">modal</div>,
}));

describe('BookingButton', () => {
  it('renders button correctly', () => {
    renderWithTheme(
      <BookingButton
        isAvailable={true}
        isLoading={false}
        onClick={jest.fn()}
      />,
    );

    const button = screen.getByRole('button', { name: /Забронювати/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();

    expect(screen.getByTestId('auth-popover')).toBeInTheDocument();
    expect(screen.getByTestId('operator-popover')).toBeInTheDocument();
    expect(screen.getByTestId('booking-modal')).toBeInTheDocument();
  });

  it('disables button when isAvailable=false', () => {
    renderWithTheme(
      <BookingButton
        isAvailable={false}
        isLoading={false}
        onClick={jest.fn()}
      />,
    );
    const button = screen.getByRole('button', { name: /Забронювати/i });
    expect(button).toBeDisabled();
  });

  it('disables button when isLoading=true', () => {
    renderWithTheme(
      <BookingButton isAvailable={true} isLoading={true} onClick={jest.fn()} />,
    );
    const button = screen.getByRole('button', { name: /Забронювати/i });
    expect(button).toBeDisabled();
  });

  it('calls onClick when button is clicked', () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <BookingButton
        isAvailable={true}
        isLoading={false}
        onClick={handleClick}
      />,
    );

    const button = screen.getByRole('button', { name: /Забронювати/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
