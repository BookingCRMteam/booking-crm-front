import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

import { APP_ROUTE } from '@/shared/constants';
import { renderWithTheme } from '@/shared/tests';

import { CoupleBookingEmpty } from './CoupleBookingEmpty';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('CoupleBookingEmpty Component', () => {
  it('should render the empty state message correctly', () => {
    renderWithTheme(<CoupleBookingEmpty />);

    expect(
      screen.getByText(/У вас ще немає активних бронювань. Час це виправити!/i),
    ).toBeInTheDocument();
  });

  it('should render a link button that points to the catalog page', () => {
    renderWithTheme(<CoupleBookingEmpty />);

    const link = screen.getByRole('link', { name: /До каталогу/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', APP_ROUTE.CATALOG);
  });
});
