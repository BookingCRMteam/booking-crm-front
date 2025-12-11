import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useBookingStore } from '@/shared/store';
import { renderWithTheme } from '@/shared/tests/renderWithProviders';

import { BookingModal } from './BookingModal';

jest.mock('@/shared/store', () => ({
  useBookingStore: jest.fn(),
}));

jest.mock('@auth0/nextjs-auth0', () => ({
  useUser: () => ({
    user: null,
    error: null,
    isLoading: false,
  }),
}));

jest.mock('../BookingForm/BookingForm', () => ({
  BookingForm: ({ disableSubmit }: { disableSubmit?: boolean }) => (
    <div data-testid="booking-form" data-disable={disableSubmit} />
  ),
}));

jest.mock('../TourInfoBlock/TourInfoBlock', () => ({
  TourInfoBlock: () => <div data-testid="tour-info" />,
}));

jest.mock('@/shared/ui', () => ({
  CloseButton: ({ onClick }: { onClick?: () => void }) => (
    <button onClick={onClick} aria-label="close-button">
      close
    </button>
  ),
}));

describe('BookingModal', () => {
  const closeBookingModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useBookingStore as unknown as jest.Mock).mockReturnValue({
      isBookingModalOpen: true,
      closeBookingModal,
    });
  });

  it('renders modal with TourInfoBlock and BookingForm', () => {
    renderWithTheme(<BookingModal />);
    expect(screen.getByTestId('tour-info')).toBeInTheDocument();
    expect(screen.getByTestId('booking-form')).toBeInTheDocument();
  });

  it('calls closeBookingModal when clicking CloseButton', async () => {
    renderWithTheme(<BookingModal />);
    const button = screen.getByRole('button', { name: /close-button/i });
    await userEvent.click(button);
    expect(closeBookingModal).toHaveBeenCalledTimes(1);
  });

  it('passes disableSubmit=true to BookingForm', () => {
    renderWithTheme(<BookingModal disableSubmit />);
    expect(screen.getByTestId('booking-form')).toHaveAttribute(
      'data-disable',
      'true',
    );
  });

  it('passes disableSubmit=false to BookingForm by default', () => {
    renderWithTheme(<BookingModal />);
    expect(screen.getByTestId('booking-form')).toHaveAttribute(
      'data-disable',
      'false',
    );
  });

  it('does not render modal if isBookingModalOpen=false and forceOpen=false', () => {
    (useBookingStore as unknown as jest.Mock).mockReturnValue({
      isBookingModalOpen: false,
      closeBookingModal,
    });
    renderWithTheme(<BookingModal />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders modal if forceOpen=true even when isBookingModalOpen=false', () => {
    (useBookingStore as unknown as jest.Mock).mockReturnValue({
      isBookingModalOpen: false,
      closeBookingModal,
    });
    renderWithTheme(<BookingModal forceOpen />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
