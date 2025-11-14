import { render, screen } from '@testing-library/react';

import { APP_ROUTE } from '@/shared/constants';

import { Footer } from './Footer';
import { LINKS, NAVIGATION_LINKS } from './constants';

jest.mock('./ui/FooterOperatorColumn', () => ({
  FooterOperatorColumn: () => <div data-testid="footer-operator-column"></div>,
}));

describe('Footer Component', () => {
  test('should render all three main columns and essential links', () => {
    render(<Footer />);

    expect(screen.getByText(/З будь-яких питань/i)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /support@pairedpaths.com/i }),
    ).toHaveAttribute('href', 'mailto:support@pairedpaths.com');

    expect(
      screen.getByRole('link', { name: /Каталог турів/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Політика конфіденційності/i }),
    ).toBeInTheDocument();
    expect(screen.getByTestId('footer-operator-column')).toBeInTheDocument();
  });

  test.each(NAVIGATION_LINKS)(
    'should link to correct internal page for $name',
    ({ name, href }) => {
      render(<Footer />);
      const navLink = screen.getByRole('link', { name });

      expect(navLink).toBeInTheDocument();
      expect(navLink).toHaveAttribute('href', href);
    },
  );

  test.each(LINKS)(
    'should render and link to correct internal page for $name',
    ({ name, href }) => {
      render(<Footer />);
      const termsLink = screen.getByRole('link', { name });

      expect(termsLink).toBeInTheDocument();
      expect(termsLink).toHaveAttribute('href', href);
    },
  );

  test('should render the logo link and copyright text', () => {
    render(<Footer />);

    const logoLink = screen.getByRole('link', { name: 'Booking CRM logo' });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', APP_ROUTE.HOME);

    expect(
      screen.getByText(/© 2025 Paired Paths. Всі права захищено./i),
    ).toBeInTheDocument();
  });
});
