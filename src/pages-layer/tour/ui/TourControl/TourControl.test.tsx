import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { User, useUserQuery } from '@/entities/user';

import { useBookingStore } from '@/shared/store';
import { renderWithProviders } from '@/shared/tests';

import TourControl from './TourControl';

jest.mock('@auth0/nextjs-auth0', () => ({
  useUser: jest.fn(() => ({ user: null })),
}));

jest.mock('@/shared/store', () => ({
  useBookingStore: jest.fn(),
}));

jest.mock('@/entities/user', () => ({
  useUserQuery: jest.fn(),
}));

jest.mock('@/features/booking', () => ({
  BookingButton: ({
    userData,
    isAvailable,
    isLoading,
    onUserClick,
  }: {
    userData: User | null | undefined;
    isAvailable: boolean;
    isLoading: boolean;
    onUserClick: () => void;
  }) => (
    <button disabled={isLoading || !isAvailable} onClick={onUserClick}>
      {userData?.role === 'operator' ? 'Створити власний тур' : 'Забронювати'}
    </button>
  ),
}));

const baseProps = {
  tourId: 11,
  title: 'Неймовірний тур у Карпати',
  price: '10000',
  countryAndCity: 'Україна, Львів',
  date: '12.12.2025',
  availableSpots: 2,
  operator: { id: 1, name: 'TravelPro', photo: '/photo.png' },
};

const travelerUser = { role: 'traveler' } as User;
const operatorUser = { role: 'operator' } as User;

describe('TourControl', () => {
  const mockOpenAuthPopover = jest.fn();
  const mockOpenBookingModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useBookingStore as unknown as jest.Mock).mockReturnValue({
      openAuthPopover: mockOpenAuthPopover,
      openBookingModal: mockOpenBookingModal,
    });

    (useUserQuery as jest.Mock).mockReturnValue({
      data: travelerUser,
      isLoading: false,
    });
  });

  it('renders main tour info correctly including operator photo', () => {
    renderWithProviders(<TourControl {...baseProps} />);
    expect(
      screen.getByRole('heading', { name: /Неймовірний тур у Карпати/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      baseProps.operator.photo,
    );
  });

  it('displays fallback photo when operator photo is missing', () => {
    renderWithProviders(
      <TourControl
        {...baseProps}
        operator={{ id: 1, name: 'Operator', photo: null }}
      />,
    );
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      '/images/operator_placeholder.png',
    );
  });

  it('shows availability badge and enables booking button when spots are available', () => {
    renderWithProviders(<TourControl {...baseProps} />);
    const expectedText = `Залишилось\n${baseProps.availableSpots} вільних місця`;
    const badge = screen.getByText(expectedText.split('\n').join(' '));
    expect(badge).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Забронювати/i })).toBeEnabled();
  });

  it('shows "all spots booked" badge and disables booking button when tour is full', () => {
    renderWithProviders(<TourControl {...baseProps} availableSpots={0} />);
    expect(screen.getByText('Всі місця заброньовано')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Забронювати/i })).toBeDisabled();
  });

  it('calls openAuthPopover when user is guest', async () => {
    (useUserQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });
    renderWithProviders(<TourControl {...baseProps} />);
    await userEvent.click(screen.getByRole('button', { name: /Забронювати/i }));
    expect(mockOpenAuthPopover).toHaveBeenCalled();
  });

  it('disables booking button when user data is loading', () => {
    (useUserQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    });
    renderWithProviders(<TourControl {...baseProps} />);
    expect(screen.getByRole('button', { name: /Забронювати/i })).toBeDisabled();
  });

  it('calls openBookingModal when user is traveler', async () => {
    (useUserQuery as jest.Mock).mockReturnValue({
      data: travelerUser,
      isLoading: false,
    });
    renderWithProviders(<TourControl {...baseProps} />);
    await userEvent.click(screen.getByRole('button', { name: /Забронювати/i }));
    expect(mockOpenBookingModal).toHaveBeenCalledWith({
      tourId: baseProps.tourId,
      title: baseProps.title,
      price: baseProps.price,
      countryAndCity: baseProps.countryAndCity,
      date: baseProps.date,
    });
  });

  it('renders booking button and message for operator', () => {
    (useUserQuery as jest.Mock).mockReturnValue({
      data: operatorUser,
      isLoading: false,
    });

    renderWithProviders(<TourControl {...baseProps} />);

    expect(
      screen.getByRole('button', { name: /Створити власний тур/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Ви як авторизований туроператор/i),
    ).toBeInTheDocument();
  });
});
