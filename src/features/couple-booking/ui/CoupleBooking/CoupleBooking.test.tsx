import { screen } from '@testing-library/react';

import { useUserBookingsQuery } from '@/entities/booking';

import { renderWithTheme } from '@/shared/tests';

import { CoupleBooking } from './CoupleBooking';

jest.mock('@/entities/booking', () => ({
  useUserBookingsQuery: jest.fn(),
}));
jest.mock('@/shared/ui', () => ({
  TourCard: () => <div data-testid="tour-card" />,
}));

jest.mock('../CoupleBookingEmpty/CoupleBookingEmpty', () => ({
  CoupleBookingEmpty: () => <div data-testid="empty-state" />,
}));

const mockBookings = [
  {
    bookingId: 1,
    bookingPrice: '500$',
    tour: {
      id: 101,
      title: 'Test Tour 1',
      availableSpots: 5,
      photos: [],
      startDate: '2025-01-01',
      endDate: '2025-01-10',
      country: { name: 'Ukraine' },
      operator: { id: 1, firstName: 'John', lastName: 'Doe', photo: null },
    },
  },
  {
    bookingId: 2,
    bookingPrice: '700$',
    tour: {
      id: 102,
      title: 'Test Tour 2',
      availableSpots: 2,
      photos: [],
      startDate: '2025-02-01',
      endDate: '2025-02-10',
      country: { name: 'France' },
      operator: { id: 2, firstName: 'Jane', lastName: 'Smith', photo: null },
    },
  },
];

describe('CoupleBooking Component', () => {
  it('should render the title "Наші бронювання"', () => {
    (useUserBookingsQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });
    renderWithTheme(<CoupleBooking />);

    expect(screen.getByText(/Наші бронювання/i)).toBeInTheDocument();
  });

  it('should show loader when isLoading is true', () => {
    (useUserBookingsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    });
    renderWithTheme(<CoupleBooking />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should show empty state when there are no bookings', () => {
    (useUserBookingsQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });
    renderWithTheme(<CoupleBooking />);

    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(screen.queryByTestId('tour-card')).not.toBeInTheDocument();
  });

  it('should render a list of TourCards when bookings are available', () => {
    (useUserBookingsQuery as jest.Mock).mockReturnValue({
      data: mockBookings,
      isLoading: false,
    });
    renderWithTheme(<CoupleBooking />);

    const cards = screen.getAllByTestId('tour-card');
    expect(cards).toHaveLength(2);
    expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});
