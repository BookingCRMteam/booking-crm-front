import { render, screen } from '@testing-library/react';

import { PriceDisplay } from './PriceDisplay';

describe('PriceDisplay', () => {
  it('renders correctly with given price', () => {
    render(<PriceDisplay price="2500" />);

    const container = screen.getByText('(за двох)').parentElement;

    expect(container).toHaveTextContent(/₴2\s?500\(за двох\)/);
  });

  it('renders non-numeric price as is', () => {
    render(<PriceDisplay price="N/A" />);

    const container = screen.getByText('(за двох)').parentElement;

    expect(container).toHaveTextContent('₴N/A(за двох)');
  });
});
