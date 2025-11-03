import { render, screen } from '@testing-library/react';

import { useBookingStore } from '@/shared/store';

import { PageOverlay } from './PageOverlay';

jest.mock('@/shared/store', () => ({
  useBookingStore: jest.fn(),
}));

describe('PageOverlay', () => {
  const mockUseBookingStore = useBookingStore as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render overlay if isRedirecting is false', () => {
    mockUseBookingStore.mockReturnValue({ isRedirecting: false });

    const { container } = render(<PageOverlay />);
    expect(container.firstChild).toBeNull();
  });

  it('renders overlay with CircularProgress if isRedirecting is true', () => {
    mockUseBookingStore.mockReturnValue({ isRedirecting: true });

    render(<PageOverlay />);

    const circularProgress = screen.getByLabelText(
      'Виконується перенаправлення, зачекайте...',
    );
    expect(circularProgress).toBeInTheDocument();

    const overlayBox = circularProgress.parentElement;
    expect(overlayBox).toHaveStyle('position: fixed');
    expect(overlayBox).toHaveStyle('display: flex');
  });
});
