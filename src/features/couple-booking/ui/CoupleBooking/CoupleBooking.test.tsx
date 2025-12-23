import { screen } from '@testing-library/react';

import { useInfiniteToursCollection } from '@/entities/tour';

import { renderWithTheme } from '@/shared/tests';

import { CoupleBooking } from './CoupleBooking';

jest.mock('@/entities/tour', () => ({
  useInfiniteToursCollection: jest.fn(),
}));

jest.mock('@/shared/ui', () => ({
  ToursCollection: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="tours-collection">{children}</div>
  ),
  TourCard: () => <div data-testid="tour-card" />,
  ButtonTop: () => null,
}));

jest.mock('../CoupleBookingEmpty/CoupleBookingEmpty', () => ({
  CoupleBookingEmpty: () => <div data-testid="empty-state" />,
}));

const mockInfiniteBookings = {
  pages: [
    {
      data: [
        {
          bookingId: 1,
          bookingPrice: '500$',
          status: 'pending',
          tour: {
            id: 101,
            title: 'Test Tour 1',
            availableSpots: 5,
            photos: [],
            startDate: '2025-01-01',
            endDate: '2025-01-10',
            country: { name: 'Ukraine' },
            operator: {
              id: 1,
              firstName: 'John',
              lastName: 'Doe',
              photo: null,
            },
          },
        },
        {
          bookingId: 2,
          bookingPrice: '700$',
          status: 'paid',
          tour: {
            id: 102,
            title: 'Test Tour 2',
            availableSpots: 2,
            photos: [],
            startDate: '2025-02-01',
            endDate: '2025-02-10',
            country: { name: 'France' },
            operator: {
              id: 2,
              firstName: 'Jane',
              lastName: 'Smith',
              photo: null,
            },
          },
        },
      ],
    },
  ],
};

describe('CoupleBooking Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the title "Наші бронювання"', () => {
    (useInfiniteToursCollection as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    });

    renderWithTheme(<CoupleBooking />);
    expect(screen.getByText(/Наші бронювання/i)).toBeInTheDocument();
  });

  it('should show loader when isLoading is true', () => {
    (useInfiniteToursCollection as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    renderWithTheme(<CoupleBooking />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should show empty state when there are no bookings', () => {
    (useInfiniteToursCollection as jest.Mock).mockReturnValue({
      data: { pages: [{ data: [] }] },
      isLoading: false,
      error: null,
    });

    renderWithTheme(<CoupleBooking />);
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(screen.queryByTestId('tour-card')).not.toBeInTheDocument();
  });

  it('should render a list of TourCards when bookings are available', () => {
    (useInfiniteToursCollection as jest.Mock).mockReturnValue({
      data: mockInfiniteBookings,
      isLoading: false,
      error: null,
      isFetchingNextPage: false,
      ref: jest.fn(),
    });

    renderWithTheme(<CoupleBooking />);

    const cards = screen.getAllByTestId('tour-card');
    expect(cards).toHaveLength(2);
    expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});
