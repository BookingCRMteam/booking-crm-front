import { ReactNode } from 'react';

import { render, screen } from '@testing-library/react';

import { APP_ROUTE } from '@/shared/constants';

import { OperatorToursEmpty } from './OperatorToursEmpty';

jest.mock('next/link', () => {
  return ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('OperatorToursEmpty', () => {
  test('renders image, text and button', () => {
    render(<OperatorToursEmpty />);

    const img = screen.getByAltText('Малюнки різних природніх краєвидів.');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/operator_tours_empty.png');

    expect(
      screen.getByText(/Туроператор зараз працює над новими маршрутами/i),
    ).toBeInTheDocument();

    const buttonLink = screen.getByRole('link', { name: /До каталогу/i });
    expect(buttonLink).toBeInTheDocument();
    expect(buttonLink).toHaveAttribute('href', APP_ROUTE.CATALOG);
  });
});
