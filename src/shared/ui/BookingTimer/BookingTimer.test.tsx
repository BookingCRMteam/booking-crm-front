import { useGetBookingExpirationQuery } from '@/entities/booking/model/useGetBookingExpiration';

import { renderWithTheme } from '@/shared/tests';
import { getMinutesRemaining, getPluralMinutes } from '@/shared/utils';

import { BookingTimer } from './BookingTimer';

jest.mock('@/entities/booking/model/useGetBookingExpiration');
jest.mock('@/shared/utils');

describe('BookingTimer Component', () => {
  const mockBookingId = 123;
  const mockExpiresAt = '2025-12-21T12:00:00Z';

  beforeEach(() => {
    jest.clearAllMocks();
    (getPluralMinutes as jest.Mock).mockImplementation((n) =>
      n === 1 ? 'хвилина' : 'хвилин',
    );
    (getMinutesRemaining as jest.Mock).mockReturnValue(10);
  });

  it('should render skeleton while loading', () => {
    (useGetBookingExpirationQuery as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    const { getByTestId } = renderWithTheme(
      <BookingTimer bookingId={mockBookingId} />,
    );

    expect(getByTestId('booking-timer-skeleton')).toBeInTheDocument();
  });

  it('should return null if there is an error or data is expired', () => {
    (useGetBookingExpirationQuery as jest.Mock).mockReturnValue({
      data: { isExpired: true, expiresAt: mockExpiresAt },
      isLoading: false,
    });

    const { container } = renderWithTheme(
      <BookingTimer bookingId={mockBookingId} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render card variant correctly', () => {
    (useGetBookingExpirationQuery as jest.Mock).mockReturnValue({
      data: { isExpired: false, expiresAt: mockExpiresAt },
      isLoading: false,
    });
    (getMinutesRemaining as jest.Mock).mockReturnValue(5);
    (getPluralMinutes as jest.Mock).mockReturnValue('хвилин');

    const { getByText } = renderWithTheme(
      <BookingTimer bookingId={mockBookingId} variant="card" />,
    );

    expect(getByText('5 хвилин')).toBeInTheDocument();
    const wrapper = getByText('5 хвилин').parentElement;
    expect(wrapper).toHaveStyle({ position: 'absolute' });
  });

  it('should render modal variant with correct styles', () => {
    (useGetBookingExpirationQuery as jest.Mock).mockReturnValue({
      data: { isExpired: false, expiresAt: mockExpiresAt },
      isLoading: false,
    });
    (getMinutesRemaining as jest.Mock).mockReturnValue(1);
    (getPluralMinutes as jest.Mock).mockReturnValue('хвилина');

    const { getByText } = renderWithTheme(
      <BookingTimer bookingId={mockBookingId} variant="modal" />,
    );

    const text = getByText('1 хвилина');
    expect(text).toBeInTheDocument();
    expect(text).toHaveStyle({ fontWeight: '700' });
  });

  it('should disappear when minutesLeft becomes 0', () => {
    (useGetBookingExpirationQuery as jest.Mock).mockReturnValue({
      data: { isExpired: false, expiresAt: mockExpiresAt },
      isLoading: false,
    });

    (getMinutesRemaining as jest.Mock).mockReturnValue(0);

    const { container } = renderWithTheme(
      <BookingTimer bookingId={mockBookingId} />,
    );
    expect(container.firstChild).toBeNull();
  });
});
