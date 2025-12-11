import { render, screen } from '@testing-library/react';

import { Tours } from '@/entities/tour';

import { mockTour } from '@/shared/tests';

import { ToursCollection } from './ToursCollection';

jest.mock('@/shared/ui', () => ({
  TourCard: jest.fn(() => <div data-testid="tour-card" />),
  ButtonTop: jest.fn(() => <div data-testid="button-top" />),
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

describe('ToursCollection', () => {
  it('renders TourCard for each tour in all pages', () => {
    render(<ToursCollection {...defaultProps} />);

    const allToursCount = mockInfiniteData.pages.reduce(
      (sum, page) => sum + page.data.length,
      0,
    );

    expect(screen.getAllByTestId('tour-card')).toHaveLength(allToursCount);
  });

  it('attaches ref to the loading Box', () => {
    const mockRef = jest.fn();
    render(<ToursCollection {...defaultProps} ref={mockRef} />);

    expect(mockRef).toHaveBeenCalled();
  });
});
