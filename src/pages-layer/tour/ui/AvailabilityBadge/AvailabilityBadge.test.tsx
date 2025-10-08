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
  test('показує текст із кількістю вільних місць, коли місця ще є', () => {
    const availableSpots = 2;

    renderWithTheme(
      <AvailabilityBadge isAvailable={true} availableSpots={availableSpots} />,
    );

    const expectedText = `Залишилось\n${availableSpots} вільних місця`;
    const badge = screen.getByText(expectedText.split('\n').join(' '));

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveStyle(
      `background-color: ${mockTheme.palette.accent[2]}`,
    );
  });

  test('показує текст "всі місця заброньовано", коли місць немає', () => {
    renderWithTheme(
      <AvailabilityBadge isAvailable={false} availableSpots={0} />,
    );
    const expectedText = 'Всі місця\nзаброньовано';
    const badge = screen.getByText(expectedText.split('\n').join(' '));

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveStyle(
      `background-color: ${mockTheme.palette.accent[1]}`,
    );
  });
});
