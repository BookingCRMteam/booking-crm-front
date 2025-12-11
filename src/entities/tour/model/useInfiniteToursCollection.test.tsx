import { useInfiniteQuery } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { useInView } from 'react-intersection-observer';

import { Tours } from '@/entities/tour/model/types';

import { mockTour } from '@/shared/tests';

import { useInfiniteToursCollection } from './useInfiniteToursCollection';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useInfiniteQuery: jest.fn(),
}));

jest.mock('@/entities/tour/api/toursApi', () => ({
  fetchTours: jest.fn(),
}));

jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(() => ({ ref: jest.fn(), inView: false })),
}));

const mockTourData: Tours = {
  data: [mockTour],
  meta: {
    offset: 0,
    limit: 1,
    total: '3',
  },
  message: '',
};

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useInfiniteCatalogTours Hook', () => {
  const mockFetchNextPage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: { pages: [mockTourData], pageParams: [0] },
      fetchNextPage: mockFetchNextPage,
      error: null,
      hasNextPage: true,
      isFetchingNextPage: false,
    });
  });

  it('should calculate next page offset correctly', () => {
    let queryOptions = {};

    (useInfiniteQuery as jest.Mock).mockImplementation((options) => {
      queryOptions = options;
      return {
        data: { pages: [mockTourData], pageParams: [0] },
        fetchNextPage: mockFetchNextPage,
        error: null,
        hasNextPage: true,
        isFetchingNextPage: false,
      };
    });

    renderHook(
      () =>
        useInfiniteToursCollection({
          initialData: mockTourData,
          queryKey: ['tours', 'catalog'],
          queryFn: jest.fn().mockResolvedValue(mockTourData),
        }),
      {
        wrapper,
      },
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getNextPageParam = (queryOptions as any).getNextPageParam;

    const nextOffset = getNextPageParam(mockTourData);
    expect(nextOffset).toBe(1);

    const finalPageData = {
      ...mockTourData,
      meta: { offset: 2, limit: 1, total: '3' },
    };
    const finalOffset = getNextPageParam(finalPageData);
    expect(finalOffset).toBeUndefined();
  });

  it('should call fetchNextPage when intersecting the ref and hasNextPage is true', async () => {
    const mockOnChange = jest.fn();

    (useInView as jest.Mock).mockReturnValue({
      ref: jest.fn(),
      inView: false,
      onChange: mockOnChange,
    });

    renderHook(
      () =>
        useInfiniteToursCollection({
          initialData: mockTourData,
          queryKey: ['tours', 'catalog'],
          queryFn: jest.fn().mockResolvedValue(mockTourData),
        }),
      {
        wrapper,
      },
    );

    const passedOnChange = (useInView as jest.Mock).mock.calls[0][0].onChange;

    passedOnChange(true);

    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);

    passedOnChange(false);
    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
  });
});
