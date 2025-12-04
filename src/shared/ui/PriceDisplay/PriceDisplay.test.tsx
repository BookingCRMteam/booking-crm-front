import { render, screen } from '@testing-library/react';

import { PriceDisplay } from './PriceDisplay';

describe('PriceDisplay', () => {
  it('renders correctly with given price', () => {
    render(<PriceDisplay price="2500" />);

    expect(screen.getByText('₴')).toBeInTheDocument();

    expect(screen.getByText(/2\s?500/)).toBeInTheDocument();

    expect(screen.getByText('(за двох)')).toBeInTheDocument();
  });
});
