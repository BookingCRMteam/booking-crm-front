import { usePathname, useRouter } from 'next/navigation';

import { fireEvent, screen } from '@testing-library/react';

import { AUTH_URL } from '@/shared/constants';
import { useBookingStore } from '@/shared/store';
import { renderWithTheme } from '@/shared/tests/renderWithProviders';

import { BookingAuthPopover } from './BookingAuthPopover';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('@/shared/store', () => ({
  useBookingStore: jest.fn(),
}));

jest.mock('@/shared/constants', () => ({
  AUTH_URL: { LOGIN: '/auth/login' },
}));

jest.mock('@/shared/ui', () => ({
  CloseButton: ({
    onClick,
  }: {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }) => (
    <button onClick={onClick} aria-label="close-button">
      close
    </button>
  ),
}));

describe('BookingAuthPopover', () => {
  const closeAuthPopover = jest.fn();
  const push = jest.fn();
  const mockAnchorEl = document.createElement('div');

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    (usePathname as jest.Mock).mockReturnValue('/current-page');
    (useBookingStore as unknown as jest.Mock).mockReturnValue({
      isAuthPopoverOpen: true,
      closeAuthPopover,
    });
    jest.clearAllMocks();
  });

  test('renders correctly when open', () => {
    renderWithTheme(<BookingAuthPopover anchorEl={mockAnchorEl} />);
    expect(
      screen.getByText(/будь ласка, увійдіть в свій акаунт/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /вхід\/реєстрація/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /відмінити/i }),
    ).toBeInTheDocument();
  });

  test('calls closeAuthPopover when clicking cancel button', () => {
    renderWithTheme(<BookingAuthPopover anchorEl={mockAnchorEl} />);
    fireEvent.click(screen.getByRole('button', { name: /відмінити/i }));
    expect(closeAuthPopover).toHaveBeenCalled();
  });

  test('navigates to login when clicking auth button', () => {
    renderWithTheme(<BookingAuthPopover anchorEl={mockAnchorEl} />);
    fireEvent.click(screen.getByRole('button', { name: /вхід\/реєстрація/i }));
    expect(closeAuthPopover).toHaveBeenCalled();
    expect(push).toHaveBeenCalledWith(
      `${AUTH_URL.LOGIN}?returnTo=${encodeURIComponent('/current-page')}`,
    );
  });

  test('does not close or navigate if forceOpen = true', () => {
    renderWithTheme(<BookingAuthPopover anchorEl={mockAnchorEl} forceOpen />);
    fireEvent.click(screen.getByRole('button', { name: /вхід\/реєстрація/i }));
    expect(closeAuthPopover).not.toHaveBeenCalled();
    expect(push).not.toHaveBeenCalled();
  });

  test('close button calls closeAuthPopover', () => {
    renderWithTheme(<BookingAuthPopover anchorEl={mockAnchorEl} />);
    fireEvent.click(screen.getByRole('button', { name: /close-button/i }));
    expect(closeAuthPopover).toHaveBeenCalled();
  });

  test('popover is closed when isAuthPopoverOpen=false and forceOpen=false', () => {
    (useBookingStore as unknown as jest.Mock).mockReturnValue({
      isAuthPopoverOpen: false,
      closeAuthPopover,
    });

    renderWithTheme(<BookingAuthPopover anchorEl={mockAnchorEl} />);
    const popover = screen.queryByRole('dialog');
    expect(popover).not.toBeInTheDocument();
  });
});
