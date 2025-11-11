import { render, screen } from '@testing-library/react';

import { APP_ROUTE, AUTH_URL } from '@/shared/constants';

import { Footer } from './Footer';
import { LINKS, NAVIGATION_LINKS } from './constants';

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

    expect(
      screen.getByRole('heading', { name: /Організаторам подорожей/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Стати партнером/i }),
    ).toBeInTheDocument();
  });

  test.each(NAVIGATION_LINKS)(
    'should link to correct internal page for $name',
    async ({ name, href }) => {
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

  test('should link to the correct partner login URL', () => {
    render(<Footer />);
    const ctaButton = screen.getByRole('link', { name: /Стати партнером/i });

    const expectedHref = `${AUTH_URL.LOGIN}?returnTo=${APP_ROUTE.AUTH_REDIRECT_OPERATOR}`;

    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', expectedHref);
    expect(ctaButton.tagName).toBe('A');
  });

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
