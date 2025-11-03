import { screen } from '@testing-library/react';

import { useBookingStore } from '@/shared/store';
import { renderWithTheme } from '@/shared/tests/renderWithProviders';

import { TourInfoBlock } from './TourInfoBlock';

jest.mock('@/shared/store', () => ({
  useBookingStore: jest.fn(),
}));

jest.mock('@/shared/ui', () => ({
  LocationDisplay: () => <div />,
  DateDisplay: () => <div />,
  PriceDisplay: () => <div />,
}));

describe('TourInfoBlock', () => {
  const mockTourData = {
    tourId: 10,
    title: 'Романтична Флоренція',
    price: '78 567',
    countryAndCity: 'Флоренція, Італія',
    date: '01.10.25 — 07.10.25',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders nothing if tourData is null', () => {
    (useBookingStore as unknown as jest.Mock).mockReturnValue({
      tourData: null,
    });
    const { container } = renderWithTheme(<TourInfoBlock />);
    expect(container).toBeEmptyDOMElement();
  });

  test('renders title correctly', () => {
    (useBookingStore as unknown as jest.Mock).mockReturnValue({
      tourData: mockTourData,
    });

    renderWithTheme(<TourInfoBlock />);

    expect(screen.getByText(mockTourData.title)).toBeInTheDocument();
  });
});
