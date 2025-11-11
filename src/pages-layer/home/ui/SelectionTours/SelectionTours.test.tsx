import { useFetchTours } from '@/entities/tour';

import { renderWithTheme } from '@/shared/tests';

import { SelectionTours } from './SelectionTours';
import {
  SELECTION_TOURS_DESCRIPTION,
  SELECTION_TOURS_TITLE,
} from './constants';

jest.mock('@/entities/tour', () => ({
  useFetchTours: jest.fn(),
}));

jest.mock('@/shared/ui', () => ({
  TourCard: jest.fn(() => <div data-testid="tour-card" />),
  TourCardSkeleton: jest.fn(() => <div data-testid="tour-card-skeleton" />),
}));

const mockUseFetchTours = useFetchTours as jest.Mock;

describe('SelectionTours', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title and description when loading', () => {
    mockUseFetchTours.mockReturnValue({
      data: null,
      isLoading: true,
      isSuccess: false,
      isError: false,
    });

    const { getByText } = renderWithTheme(<SelectionTours />);

    expect(getByText(SELECTION_TOURS_TITLE)).toBeInTheDocument();
    expect(getByText(SELECTION_TOURS_DESCRIPTION)).toBeInTheDocument();
  });

  it('renders skeletons when loading', () => {
    mockUseFetchTours.mockReturnValue({
      data: null,
      isLoading: true,
      isSuccess: false,
      isError: false,
    });

    const { getAllByTestId } = renderWithTheme(<SelectionTours />);
    expect(getAllByTestId('tour-card-skeleton')).toHaveLength(3);
  });

  it('renders skeletons when error', () => {
    mockUseFetchTours.mockReturnValue({
      data: null,
      isLoading: false,
      isSuccess: false,
      isError: true,
    });

    const { getAllByTestId } = renderWithTheme(<SelectionTours />);
    expect(getAllByTestId('tour-card-skeleton')).toHaveLength(3);
  });

  it('renders tours when success', () => {
    const mockTours = {
      data: [
        {
          id: 1,
          title: 'Гори Карпат',
          availableSpots: 10,
          price: 1200,
          photos: ['/photo.png'],
          startDate: '2025-07-01',
          endDate: '2025-07-05',
          country: { translations: [{ name: 'Україна' }] },
          operator: {
            id: 2,
            firstName: 'Іван',
            lastName: 'Петренко',
            photo: '/photo.png',
          },
        },
      ],
    };

    mockUseFetchTours.mockReturnValue({
      data: mockTours,
      isLoading: false,
      isSuccess: true,
      isError: false,
    });

    const { getAllByTestId } = renderWithTheme(<SelectionTours />);
    expect(getAllByTestId('tour-card')).toHaveLength(1);
  });
});
