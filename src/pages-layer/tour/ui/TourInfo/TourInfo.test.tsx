import { screen } from '@testing-library/react';

import { renderWithTheme } from '@/shared/tests';

import { TourInfo } from './TourInfo';

const mockOperator = {
  id: 1,
  name: 'John Doe',
  photo: '/photo.jpg',
};

const defaultProps = {
  title: 'Summer Paradise Tour',
  price: '1200$',
  countryAndCity: 'Egypt, Hurghada',
  date: '10.10.2024 - 20.10.2024',
  operator: mockOperator,
  availableSpots: 5,
};

describe('TourInfo Component', () => {
  it('should render the tour title correctly', () => {
    renderWithTheme(<TourInfo {...defaultProps} />);

    const titleElement = screen.getByRole('heading', { level: 1 });
    expect(titleElement).toHaveTextContent('Summer Paradise Tour');
  });

  it('should display AvailabilityBadge when variant is "catalog"', () => {
    renderWithTheme(<TourInfo {...defaultProps} variant="catalog" />);

    expect(screen.getByText(/5/i)).toBeInTheDocument();
  });

  it('should NOT display AvailabilityBadge when variant is "booking"', () => {
    renderWithTheme(<TourInfo {...defaultProps} variant="booking" />);

    const badgeText = screen.queryByText(/5/i);
    expect(badgeText).not.toBeInTheDocument();
  });

  it('should render correct data in Price, Location, and Date displays', () => {
    renderWithTheme(<TourInfo {...defaultProps} />);

    expect(screen.getByText('1200$')).toBeInTheDocument();
    expect(screen.getByText('Egypt, Hurghada')).toBeInTheDocument();
    expect(screen.getByText('10.10.2024 - 20.10.2024')).toBeInTheDocument();
  });

  it('should render the operator link with the correct name', () => {
    renderWithTheme(<TourInfo {...defaultProps} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
