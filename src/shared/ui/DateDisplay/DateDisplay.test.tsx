import { render, screen } from '@testing-library/react';

import { DateDisplay } from './DateDisplay';

describe('DateDisplay', () => {
  it('renders the date text correctly', () => {
    const mockDate = '2025-11-02';
    render(<DateDisplay date={mockDate} />);

    expect(screen.getByText(mockDate)).toBeInTheDocument();
  });

  it('renders the CalendarDotsIcon', () => {
    const mockDate = '2025-11-02';
    render(<DateDisplay date={mockDate} />);

    const icon = screen.getByTestId('calendar-icon');
    expect(icon).toBeInTheDocument();
  });

  it('has correct typography variant and structure', () => {
    const mockDate = '2025-11-02';
    render(<DateDisplay date={mockDate} />);

    const textElement = screen.getByText(mockDate);
    expect(textElement.tagName.toLowerCase()).toBe('p');
  });
});
