import { useRouter } from 'next/navigation';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useBookingStore } from '@/shared/store';
import { renderWithTheme } from '@/shared/tests/renderWithProviders';
import { UserRole } from '@/shared/types';

import { BookingButton } from './BookingButton';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/shared/store', () => ({
  useBookingStore: jest.fn(),
}));

jest.mock('@auth0/nextjs-auth0', () => ({
  useUser: () => ({
    user: null,
    error: null,
    isLoading: false,
  }),
}));

jest.mock('../BookingAuthPopover/BookingAuthPopover', () => ({
  BookingAuthPopover: ({
    anchorEl,
  }: {
    anchorEl: HTMLButtonElement | null;
  }) => <div data-testid="auth-popover">{anchorEl ? 'open' : 'closed'}</div>,
}));

jest.mock('../BookingModal/BookingModal', () => ({
  BookingModal: () => <div data-testid="booking-modal">modal</div>,
}));

const mockUserOperator = {
  id: 10,
  email: 'existing@example.com',
  sub: 'sub123',
  createdAt: '2025-01-01',
  updatedAt: '2025-01-01',
  operatorId: 1,
  firstPersonName: 'Олена',
  firstPersonSurname: 'Петренко',
  secondPersonName: 'Тимофій',
  secondPersonSurname: 'Петренко',
  phone: '+380971234567',
  role: 'operator' as UserRole,
} as const;

const mockUserTraveler = {
  id: 12,
  email: 'existing@example.com',
  sub: 'sub123',
  createdAt: '2025-01-01',
  updatedAt: '2025-01-01',
  operatorId: null,
  firstPersonName: 'Олена',
  firstPersonSurname: 'Петренко',
  secondPersonName: 'Тимофій',
  secondPersonSurname: 'Петренко',
  phone: '+380971234567',
  role: 'traveler' as UserRole,
};

describe('BookingButton', () => {
  const push = jest.fn();
  const startRedirect = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    (useBookingStore as unknown as jest.Mock).mockReturnValue({
      isRedirecting: false,
      startRedirect,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly for guest', () => {
    renderWithTheme(
      <BookingButton
        userData={null}
        isAvailable={true}
        isLoading={false}
        onUserClick={jest.fn()}
      />,
    );

    const button = screen.getByRole('button', { name: /Забронювати/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();

    expect(screen.getByTestId('auth-popover')).toBeInTheDocument();
    expect(screen.getByTestId('booking-modal')).toBeInTheDocument();
  });

  it('disables button when isAvailable=false and user is traveler', () => {
    renderWithTheme(
      <BookingButton
        userData={mockUserTraveler}
        isAvailable={false}
        isLoading={false}
        onUserClick={jest.fn()}
      />,
    );
    const button = screen.getByRole('button', { name: /Забронювати/i });
    expect(button).toBeDisabled();
  });

  it('disables button when userData is undefined (loading)', () => {
    renderWithTheme(
      <BookingButton
        userData={undefined}
        isAvailable={true}
        isLoading={false}
        onUserClick={jest.fn()}
      />,
    );
    const button = screen.getByRole('button', { name: /Забронювати/i });
    expect(button).toBeDisabled();
  });

  it('disables button when isLoading=true', () => {
    renderWithTheme(
      <BookingButton
        userData={mockUserTraveler}
        isAvailable={true}
        isLoading={true}
        onUserClick={jest.fn()}
      />,
    );
    const button = screen.getByRole('button', { name: /Забронювати/i });
    expect(button).toBeDisabled();
  });

  it('calls onUserClick when traveler clicks the button', async () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <BookingButton
        userData={mockUserTraveler}
        isAvailable={true}
        isLoading={false}
        onUserClick={handleClick}
      />,
    );

    const button = screen.getByRole('button', { name: /Забронювати/i });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls startRedirect and navigates when operator clicks the button', async () => {
    renderWithTheme(
      <BookingButton
        userData={mockUserOperator}
        isAvailable={true}
        isLoading={false}
        onUserClick={jest.fn()}
      />,
    );

    const button = screen.getByRole('button', {
      name: /Створити власний тур/i,
    });

    await userEvent.click(button);

    expect(startRedirect).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith(expect.stringMatching(/operator/i));
  });
});
