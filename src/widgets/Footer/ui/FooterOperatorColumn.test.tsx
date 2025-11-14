import { render, screen } from '@testing-library/react';

import { useUserQuery } from '@/entities/user';

import { APP_ROUTE, AUTH_URL } from '@/shared/constants';

import { FooterOperatorColumn } from './FooterOperatorColumn';
import {
  FOOTER_OPERATOR_BUTTON,
  FOOTER_OPERATOR_DESCRIPTION,
  FOOTER_OPERATOR_TITLE,
} from './constants';

jest.mock('@/entities/user', () => ({
  useUserQuery: jest.fn(),
}));

describe('FooterOperatorColumn', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useUserQuery as jest.Mock).mockReturnValue({ data: null });
  });

  it('renders title, description and CTA button', () => {
    render(<FooterOperatorColumn />);

    expect(screen.getByText(FOOTER_OPERATOR_TITLE)).toBeInTheDocument();
    expect(screen.getByText(FOOTER_OPERATOR_DESCRIPTION)).toBeInTheDocument();
    screen.getByRole('link', { name: FOOTER_OPERATOR_BUTTON });
  });

  it('redirects unauthenticated user to login with onboarding redirect', () => {
    render(<FooterOperatorColumn />);

    const link = screen.getByRole('link', { name: FOOTER_OPERATOR_BUTTON });
    expect(link).toHaveAttribute(
      'href',
      `${AUTH_URL.LOGIN}?returnTo=${APP_ROUTE.AUTH_REDIRECT_OPERATOR}`,
    );
  });

  it('redirects authenticated user without operator profile to onboarding', () => {
    (useUserQuery as jest.Mock).mockReturnValueOnce({
      data: { role: 'traveler' },
    });

    render(<FooterOperatorColumn />);

    const link = screen.getByRole('link', { name: FOOTER_OPERATOR_BUTTON });
    expect(link).toHaveAttribute('href', APP_ROUTE.OPERATOR_ONBOARDING);
  });

  it('redirects authenticated operator to operator dashboard', () => {
    (useUserQuery as jest.Mock).mockReturnValueOnce({
      data: { role: 'operator' },
    });

    render(<FooterOperatorColumn />);

    const link = screen.getByRole('link', { name: FOOTER_OPERATOR_BUTTON });
    expect(link).toHaveAttribute('href', APP_ROUTE.OPERATOR);
  });
});
