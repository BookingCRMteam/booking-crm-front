import { ReactNode } from 'react';

import { AUTH_URL } from '@/shared/constants';
import { renderWithTheme } from '@/shared/tests';
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

jest.mock('./constants', () => ({
  ROLE_MENU_LINKS: {
    traveler: [
      { href: '/traveler/profile', name: 'Особистий кабінет' },
      { href: '/traveler/bookings', name: 'Мої бронювання' },
    ],
    operator: [{ href: '/operator/dashboard', name: 'Дашборд' }],
  },
  LOGOUT_LINK: {
    name: 'Вийти з акаунту',
    href: AUTH_URL.LOGOUT,
  },
}));

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
    const { getByText, getByLabelText, user } = renderWithTheme(
      <AuthorizedMenu {...mockTravelerProps} />,
    );

    expect(getByText('J')).toBeInTheDocument();

    expect(getByText('Особистий кабінет')).not.toBeVisible();

    const menuButton = getByLabelText('user-menu');
    await user.click(menuButton);

    const profileLink = getByText('Особистий кабінет');
    expect(profileLink).toBeVisible();
  });

  it('should use "U" initial when firstPersonName is empty', async () => {
    const { getByText } = renderWithTheme(
      <AuthorizedMenu {...mockTravelerProps} firstPersonName="" />,
    );
    expect(getByText('U')).toBeInTheDocument();
  });

  it('should display correct links for traveler role and the Logout link', async () => {
    const { getByLabelText, getByRole, queryByText, getByText, user } =
      renderWithTheme(<AuthorizedMenu {...mockTravelerProps} />);

    await user.click(getByLabelText('user-menu'));

    expect(getByRole('link', { name: 'Особистий кабінет' })).toHaveAttribute(
      'href',
      '/traveler/profile',
    );
    expect(getByRole('link', { name: 'Мої бронювання' })).toHaveAttribute(
      'href',
      '/traveler/bookings',
    );

    expect(queryByText('Дашборд')).not.toBeInTheDocument();

    const logoutLink = getByText('Вийти з акаунту');
    expect(logoutLink).toBeInTheDocument();
    expect(logoutLink.closest('a')).toHaveAttribute('href', AUTH_URL.LOGOUT);
  });

  it('should display operator-specific links', async () => {
    const { getByLabelText, getByRole, queryByText, user } = renderWithTheme(
      <AuthorizedMenu {...mockOperatorProps} />,
    );

    await user.click(getByLabelText('user-menu'));

    expect(getByRole('link', { name: 'Дашборд' })).toHaveAttribute(
      'href',
      '/operator/dashboard',
    );
    expect(queryByText('Мої бронювання')).not.toBeInTheDocument();
  });
});
