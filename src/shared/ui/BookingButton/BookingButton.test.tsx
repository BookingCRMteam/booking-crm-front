import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

import { APP_ROUTE } from '@/shared/constants';
import { renderWithTheme } from '@/shared/tests';

import { BookingButton } from './BookingButton';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid="booking-link">
      {children}
    </a>
  );
});

describe('BookingButton Component', () => {
  const mockBookingId = 456;
  const expectedHref = `${APP_ROUTE.PROFILE}/booking/${mockBookingId}`;

  it('should render correctly with correct text', () => {
    renderWithTheme(<BookingButton bookingId={mockBookingId} />);

    expect(screen.getByText(/Заброньовано/i)).toBeInTheDocument();
  });

  it('should have the correct href attribute based on bookingId', () => {
    renderWithTheme(<BookingButton bookingId={mockBookingId} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', expectedHref);
  });
});
