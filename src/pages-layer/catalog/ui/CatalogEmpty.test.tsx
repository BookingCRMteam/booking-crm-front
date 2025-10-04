import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { APP_ROUTE } from '@/shared/constants';

import { CatalogEmpty } from './CatalogEmpty';

describe('CatalogEmpty', () => {
  it('рендерить картинку, текст та кнопку', () => {
    render(<CatalogEmpty />);

    expect(screen.getByText(/Ой, зараз тут тихо/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /На головну/i })).toHaveAttribute(
      'href',
      APP_ROUTE.HOME,
    );
  });
});
