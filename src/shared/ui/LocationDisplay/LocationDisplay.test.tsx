import { render, screen } from '@testing-library/react';

import { LocationDisplay } from './LocationDisplay';

describe('LocationDisplay', () => {
  it('renders the location text correctly', () => {
    const mockLocation = 'Prague, Czech Republic';
    render(<LocationDisplay location={mockLocation} />);

    expect(screen.getByText(mockLocation)).toBeInTheDocument();
  });

  it('renders the MapPinLineIcon', () => {
    const mockLocation = 'Prague, Czech Republic';
    render(<LocationDisplay location={mockLocation} />);

    const icon = screen.getByTestId('location-icon');
    expect(icon).toBeInTheDocument();
  });

  it('renders the Typography with correct structure', () => {
    const mockLocation = 'Kyiv, Ukraine';
    render(<LocationDisplay location={mockLocation} />);

    const textElement = screen.getByText(mockLocation);
    expect(textElement.tagName.toLowerCase()).toBe('p');
  });
});
