import { screen } from '@testing-library/react';

import { renderWithTheme } from '@/shared/tests';

import { TourPage, TourPageProps } from './TourPage';

jest.mock('@/shared/ui', () => ({
  BreadCrumbs: ({ items }: { items: { href: string; title: string }[] }) => (
    <div data-testid="breadcrumbs">{items.length} items</div>
  ),
}));

jest.mock('@/features/tour-gallery', () => ({
  TourGallery: () => <div data-testid="tour-gallery" />,
}));

jest.mock(
  '@/features/booking/ui/BookingStatusListener/BookingStatusListener',
  () => ({
    BookingStatusListener: () => <div data-testid="booking-status-listener" />,
  }),
);

jest.mock('../TourInfo/TourInfo', () => ({
  TourInfo: () => <div data-testid="tour-info" />,
}));

jest.mock('../BookingLabel/BookingLabel', () => ({
  BookingLabel: () => <div data-testid="booking-label" />,
}));

jest.mock('../TourControl/TourControl', () => ({
  __esModule: true,
  default: () => <div data-testid="tour-control" />,
}));

jest.mock('../TourDescription/TourDescription', () => ({
  __esModule: true,
  default: () => <div data-testid="tour-description" />,
}));

const mockProps: TourPageProps = {
  id: 123,
  title: 'Test Tour',
  countryAndCity: 'Ukraine, Kyiv',
  date: '2025-01-01',
  availableSpots: 10,
  description: 'Nice tour description',
  price: '1000$',
  operatorInfo: { id: 1, name: 'Operator', photo: null },
  photos: [{ url: '/test.jpg', description: 'test', isMain: true }],
  variant: 'catalog',
};

describe('TourPage Component', () => {
  it('should render core components regardless of the variant', () => {
    renderWithTheme(<TourPage {...mockProps} />);

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(screen.getByTestId('tour-info')).toBeInTheDocument();
    expect(screen.getByTestId('tour-description')).toBeInTheDocument();
  });

  describe('when variant is "catalog"', () => {
    it('should render TourControl and BookingStatusListener', () => {
      renderWithTheme(<TourPage {...mockProps} variant="catalog" />);

      expect(screen.getByTestId('tour-control')).toBeInTheDocument();
      expect(screen.getByTestId('booking-status-listener')).toBeInTheDocument();
      expect(screen.queryByTestId('booking-label')).not.toBeInTheDocument();
    });
  });

  describe('when variant is "booking"', () => {
    it('should render BookingLabel and hide catalog-specific components', () => {
      renderWithTheme(<TourPage {...mockProps} variant="booking" />);

      expect(screen.getByTestId('booking-label')).toBeInTheDocument();
      expect(screen.queryByTestId('tour-control')).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('booking-status-listener'),
      ).not.toBeInTheDocument();
    });
  });

  describe('Gallery logic', () => {
    it('should render TourGallery when photos are provided', () => {
      renderWithTheme(<TourPage {...mockProps} />);
      expect(screen.getByTestId('tour-gallery')).toBeInTheDocument();
    });

    it('should render fallback image when no photos are available', () => {
      renderWithTheme(<TourPage {...mockProps} photos={[]} />);

      const fallbackImage = screen.getByAltText('Резервне фото туру');
      expect(fallbackImage).toBeInTheDocument();
      expect(screen.queryByTestId('tour-gallery')).not.toBeInTheDocument();
    });
  });
});
