/* eslint-disable react/display-name */
import type { ReactNode } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { UserRole } from '@/shared/types';

import { AuthorizedMenu } from './AuthorizedMenu';

jest.mock(
  'next/link',
  () =>
    ({ children, href }: { children: ReactNode; href: string }) => (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        {children}
      </a>
    ),
);

jest.mock('../navigation-links', () => ({
  ROLE_MENU_LINKS: {
    traveler: [
      { href: '/traveler/profile', name: 'Мій профіль' },
      { href: '/traveler/bookings', name: 'Мої бронювання' },
    ],
    operator: [{ href: '/operator/dashboard', name: 'Дашборд' }],
  },
}));

const AUTH_URL = { LOGOUT: '/auth/logout' };

const mockTravelerProps = {
  userRole: 'traveler' as UserRole,
  firstPersonName: 'Jane',
};

const mockOperatorProps = {
  userRole: 'operator' as UserRole,
  firstPersonName: 'Kyle',
};

describe('AuthorizedMenu', () => {
  it('should display the correct initial (J) and toggle the menu on click', async () => {
    const user = userEvent.setup();
    render(<AuthorizedMenu {...mockTravelerProps} />);

    expect(screen.getByText('J')).toBeInTheDocument();

    expect(screen.getByText('Мій профіль')).not.toBeVisible();

    const menuButton = screen.getByLabelText('user-menu');
    await user.click(menuButton);

    const profileLink = screen.getByText('Мій профіль');
    expect(profileLink).toBeVisible();

    await user.click(profileLink);

    expect(screen.getByText('Мій профіль')).not.toBeVisible();
  });

  it('should use "U" initial when firstPersonName is empty', async () => {
    render(<AuthorizedMenu {...mockTravelerProps} firstPersonName="" />);

    expect(screen.getByText('U')).toBeInTheDocument();
  });

  it('should display correct links for traveler role and the Logout link', async () => {
    const user = userEvent.setup();
    render(<AuthorizedMenu {...mockTravelerProps} />);

    await user.click(screen.getByLabelText('user-menu'));

    expect(screen.getByRole('link', { name: 'Мій профіль' })).toHaveAttribute(
      'href',
      '/traveler/profile',
    );
    expect(
      screen.getByRole('link', { name: 'Мої бронювання' }),
    ).toHaveAttribute('href', '/traveler/bookings');

    expect(screen.queryByText('Дашборд')).not.toBeInTheDocument();

    const logoutLink = screen.getByText('Вийти');
    expect(logoutLink).toBeInTheDocument();
    expect(logoutLink.closest('a')).toHaveAttribute('href', AUTH_URL.LOGOUT);
  });

  it('should display operator-specific links', async () => {
    const user = userEvent.setup();

    render(<AuthorizedMenu {...mockOperatorProps} />);

    await user.click(screen.getByLabelText('user-menu'));

    expect(screen.getByRole('link', { name: 'Дашборд' })).toHaveAttribute(
      'href',
      '/operator/dashboard',
    );
    expect(screen.queryByText('Мої бронювання')).not.toBeInTheDocument();
  });
});
