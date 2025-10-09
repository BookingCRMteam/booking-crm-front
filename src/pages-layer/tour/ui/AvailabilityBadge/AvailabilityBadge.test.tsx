import { ThemeProvider, createTheme } from '@mui/material';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { AvailabilityBadge } from './AvailabilityBadge';

const mockTheme = createTheme({
  palette: {
    accent: {
      1: '#F0F0F0', // Колір для 'Unavailable'
      2: '#D4E8D4', // Колір для 'Available'
    },
  },
});

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={mockTheme}>{ui}</ThemeProvider>);

describe('AvailabilityBadge', () => {
  describe('AvailabilityBadge', () => {
    test('should display remaining spots text when some spots are available', () => {
      const availableSpots = 2;

      renderWithTheme(<AvailabilityBadge availableSpots={availableSpots} />);

      const expectedText = `Залишилось\n${availableSpots} вільних місця`;
      const badge = screen.getByText(expectedText.split('\n').join(' '));

      expect(badge).toBeInTheDocument();
      expect(badge).toHaveStyle(
        `background-color: ${mockTheme.palette.accent[2]}`,
      );
    });

    test('should display correct text when more than two spots are available', () => {
      const availableSpots = 4;

      renderWithTheme(<AvailabilityBadge availableSpots={availableSpots} />);

      const expectedText = `Залишилось\n${availableSpots} вільних місць`;
      const badge = screen.getByText(expectedText.split('\n').join(' '));

      expect(badge).toBeInTheDocument();
      expect(badge).toHaveStyle(
        `background-color: ${mockTheme.palette.accent[2]}`,
      );
    });

    test('should display "all spots booked" message when no spots are available', () => {
      renderWithTheme(<AvailabilityBadge availableSpots={0} />);

      const expectedText = 'Всі місця\nзаброньовано';
      const badge = screen.getByText(expectedText.split('\n').join(' '));

      expect(badge).toBeInTheDocument();
      expect(badge).toHaveStyle(
        `background-color: ${mockTheme.palette.accent[1]}`,
      );
    });
  });
});
