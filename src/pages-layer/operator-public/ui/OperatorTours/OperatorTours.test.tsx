import { screen } from '@testing-library/react';

import { Tours, useInfiniteToursCollection } from '@/entities/tour';

import { mockTour } from '@/shared/tests';
import { renderWithProviders } from '@/shared/tests/renderWithProviders';

import { OperatorTours } from './OperatorTours';

jest.mock('@/shared/ui', () => ({
  ToursCollection: jest.fn(() => <div data-testid="tours-collection" />),
}));

jest.mock('../OperatorToursEmpty/OperatorToursEmpty', () => ({
  OperatorToursEmpty: jest.fn(() => <div data-testid="empty-fallback" />),
}));

jest.mock('@/entities/tour', () => ({
  useInfiniteToursCollection: jest.fn(),
}));

const initialDataMock: Tours = {
  data: [mockTour],
  meta: { total: '5', limit: 6, offset: 0 },
  message: '',
};

describe('OperatorTours', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders tours when data exists', () => {
    (useInfiniteToursCollection as jest.Mock).mockReturnValue({
      data: { pages: [{ data: [{ id: 1 }] }] },
      error: null,
      isFetchingNextPage: false,
      ref: jest.fn(),
    });

    renderWithProviders(
      <OperatorTours initialData={initialDataMock} operatorId={33} />,
    );

    expect(screen.getByText('Актуальні подорожі (5)')).toBeInTheDocument();
    expect(screen.getByTestId('tours-collection')).toBeInTheDocument();
  });

  test('renders empty state when no tours + error', () => {
    (useInfiniteToursCollection as jest.Mock).mockReturnValue({
      data: { pages: [{ data: [] }] },
      error: new Error('Failed'),
      isFetchingNextPage: false,
      ref: jest.fn(),
    });

    renderWithProviders(
      <OperatorTours initialData={initialDataMock} operatorId={33} />,
    );

    expect(screen.getByTestId('empty-fallback')).toBeInTheDocument();
  });

  test('renders empty state when no tours, no error, not fetching', () => {
    (useInfiniteToursCollection as jest.Mock).mockReturnValue({
      data: { pages: [{ data: [] }] },
      error: null,
      isFetchingNextPage: false,
      ref: jest.fn(),
    });

    renderWithProviders(
      <OperatorTours initialData={initialDataMock} operatorId={33} />,
    );

    expect(screen.getByTestId('empty-fallback')).toBeInTheDocument();
  });

  test('does not render empty fallback when fetching next page', () => {
    (useInfiniteToursCollection as jest.Mock).mockReturnValue({
      data: { pages: [{ data: [] }] },
      error: null,
      isFetchingNextPage: true,
      ref: jest.fn(),
    });

    renderWithProviders(
      <OperatorTours initialData={initialDataMock} operatorId={33} />,
    );

    expect(screen.queryByTestId('empty-fallback')).not.toBeInTheDocument();
  });
});
