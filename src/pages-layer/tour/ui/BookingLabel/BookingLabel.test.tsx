import { screen } from '@testing-library/react';

import { renderWithTheme } from '@/shared/tests';

import { BookingLabel } from './BookingLabel';

describe('BookingLabel Component', () => {
  it('should render the label with correct text', () => {
    renderWithTheme(<BookingLabel />);

    expect(screen.getByText(/Заброньовано/i)).toBeInTheDocument();
  });

  it('should render as a paragraph component', () => {
    renderWithTheme(<BookingLabel />);

    const textElement = screen.getByText(/Заброньовано/i);
    expect(textElement.tagName).toBe('P');
  });
});
