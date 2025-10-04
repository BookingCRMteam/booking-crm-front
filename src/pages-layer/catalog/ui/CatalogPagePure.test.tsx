import { render, screen } from '@testing-library/react';

import { Tours } from '@/entities/tour/model/types';

import { mockTour } from '@/shared/ui/TourCard/data';

import { CatalogPagePure } from './CatalogPagePure';

jest.mock('@/shared/ui', () => ({
  TourCard: jest.fn(() => <div data-testid="tour-card" />),
}));

jest.mock('./CatalogEmpty', () => ({
  CatalogEmpty: () => <div data-testid="catalog-empty">No Tours Found</div>,
}));

const mockData: Tours = {
  data: [mockTour],
  meta: { offset: 0, limit: 2, total: '2' },
  message: '',
};

const mockInfiniteData = {
  pages: [{ ...mockData }, { ...mockData, data: [{ ...mockTour, id: 3 }] }],
  pageParams: [0, 2],
};

const defaultProps = {
  data: mockInfiniteData,
  error: null,
  isFetchingNextPage: false,
  ref: jest.fn(),
};

describe('CatalogPagePure UI', () => {
  it('should render TourCard for each tour in the data', () => {
    render(<CatalogPagePure {...defaultProps} />);

    expect(screen.getAllByTestId('tour-card')).toHaveLength(2);
  });

  it('should render CatalogEmpty when initial data is empty', () => {
    render(
      <CatalogPagePure
        {...defaultProps}
        data={{ pageParams: [], pages: [] }}
      />,
    );

    expect(screen.getByTestId('catalog-empty')).toBeInTheDocument();
    expect(screen.queryByTestId('tour-card')).not.toBeInTheDocument();
  });

  it('should render CatalogEmpty when there is an error', () => {
    render(
      <CatalogPagePure {...defaultProps} error={new Error('API error')} />,
    );

    expect(screen.getByTestId('catalog-empty')).toBeInTheDocument();
  });

  it('should render CircularProgress when fetching next page', () => {
    render(<CatalogPagePure {...defaultProps} isFetchingNextPage={true} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should NOT render CircularProgress when not fetching next page', () => {
    render(<CatalogPagePure {...defaultProps} isFetchingNextPage={false} />);

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('should attach ref to the loading box', () => {
    const mockRef = jest.fn();
    render(<CatalogPagePure {...defaultProps} ref={mockRef} />);

    expect(mockRef).toHaveBeenCalled();
  });
});
