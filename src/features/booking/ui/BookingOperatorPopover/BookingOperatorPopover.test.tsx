import { useRouter } from 'next/navigation';

import { fireEvent, screen } from '@testing-library/react';

import { APP_ROUTE } from '@/shared/constants';
import { useBookingStore } from '@/shared/store';
import { renderWithTheme } from '@/shared/tests/renderWithProviders';

import { BookingOperatorPopover } from './BookingOperatorPopover';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/shared/store', () => ({
  useBookingStore: jest.fn(),
}));

jest.mock('@/shared/constants', () => ({
  APP_ROUTE: { OPERATOR: '/operator' },
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

describe('BookingOperatorPopover', () => {
  const closeOperatorPopover = jest.fn();
  const startRedirect = jest.fn();
  const push = jest.fn();
  const mockAnchorEl = document.createElement('div');

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({ push });

    (useBookingStore as unknown as jest.Mock).mockReturnValue({
      isOperatorPopoverOpen: true,
      closeOperatorPopover,
      startRedirect,
    });
  });

  test('renders correctly when open', () => {
    renderWithTheme(<BookingOperatorPopover anchorEl={mockAnchorEl} />);

    expect(
      screen.getByText(
        /Ви, як авторизований туроператор, можете лише переглядати існуючі тури/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Відмінити/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Створити власний тур/i }),
    ).toBeInTheDocument();
  });

  test('calls closeOperatorPopover when clicking "Відмінити"', () => {
    renderWithTheme(<BookingOperatorPopover anchorEl={mockAnchorEl} />);
    fireEvent.click(screen.getByRole('button', { name: /Відмінити/i }));
    expect(closeOperatorPopover).toHaveBeenCalledTimes(1);
  });

  test('calls router.push and store actions when clicking "Створити власний тур"', () => {
    renderWithTheme(<BookingOperatorPopover anchorEl={mockAnchorEl} />);
    fireEvent.click(
      screen.getByRole('button', { name: /Створити власний тур/i }),
    );
    expect(closeOperatorPopover).toHaveBeenCalledTimes(1);
    expect(startRedirect).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith(APP_ROUTE.OPERATOR);
  });

  test('prevents redirect when forceOpen=true', () => {
    renderWithTheme(
      <BookingOperatorPopover forceOpen anchorEl={mockAnchorEl} />,
    );
    fireEvent.click(
      screen.getByRole('button', { name: /Створити власний тур/i }),
    );
    expect(closeOperatorPopover).not.toHaveBeenCalled();
    expect(startRedirect).not.toHaveBeenCalled();
    expect(push).not.toHaveBeenCalled();
  });

  test('does not call closeOperatorPopover if forceOpen=true when closing popover', () => {
    renderWithTheme(
      <BookingOperatorPopover forceOpen anchorEl={mockAnchorEl} />,
    );
    fireEvent.click(screen.getByRole('button', { name: /close-button/i }));
    expect(closeOperatorPopover).not.toHaveBeenCalled();
  });

  test('calls closeOperatorPopover when clicking CloseButton if forceOpen=false', () => {
    renderWithTheme(<BookingOperatorPopover anchorEl={mockAnchorEl} />);
    fireEvent.click(screen.getByRole('button', { name: /close-button/i }));
    expect(closeOperatorPopover).toHaveBeenCalledTimes(1);
  });

  test('popover is closed when isOperatorPopoverOpen=false and forceOpen=false', () => {
    (useBookingStore as unknown as jest.Mock).mockReturnValue({
      isOperatorPopoverOpen: false,
      closeOperatorPopover,
      startRedirect,
    });

    renderWithTheme(<BookingOperatorPopover anchorEl={mockAnchorEl} />);
    const popover = screen.queryByRole('dialog');
    expect(popover).not.toBeInTheDocument();
  });
});
