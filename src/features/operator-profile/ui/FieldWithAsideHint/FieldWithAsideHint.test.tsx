import type { ReactNode } from 'react';

import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';

import { theme } from '@/shared/theme';

import { FieldWithAsideHint } from './FieldWithAsideHint';

jest.mock('@phosphor-icons/react', () => ({
  WarningCircleIcon: () => <svg data-testid="warning-icon" />,
}));

const renderWithTheme = (ui: ReactNode) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('FieldWithAsideHint Component', () => {
  const mockHintText = 'This is a helpful instruction for the field.';
  const mockDescribedById = 'test-input-hint-id';
  const MockChild = (
    <input type="text" data-testid="mock-input" aria-label="Test Field" />
  );

  test('should render the children element', () => {
    renderWithTheme(
      <FieldWithAsideHint
        hintText={mockHintText}
        describedById={mockDescribedById}
      >
        {MockChild}
      </FieldWithAsideHint>,
    );

    expect(screen.getByTestId('mock-input')).toBeInTheDocument();
  });

  test('should display the hint text and icon in the aside wrapper', () => {
    renderWithTheme(
      <FieldWithAsideHint
        hintText={mockHintText}
        describedById={mockDescribedById}
      >
        {MockChild}
      </FieldWithAsideHint>,
    );

    expect(screen.getByTestId('warning-icon')).toBeInTheDocument();

    const visibleHints = screen.getAllByText(mockHintText);
    expect(visibleHints.length).toBeGreaterThanOrEqual(2);
  });

  test('should place hintText in a visually hidden box with the correct ID', () => {
    renderWithTheme(
      <FieldWithAsideHint
        hintText={mockHintText}
        describedById={mockDescribedById}
      >
        {MockChild}
      </FieldWithAsideHint>,
    );

    const hiddenHintBox = screen.getByText(mockHintText, {
      selector: `#${mockDescribedById}`,
    });

    expect(hiddenHintBox).toBeInTheDocument();
    expect(hiddenHintBox).toHaveAttribute('id', mockDescribedById);
  });

  test('should render a second non-visually hidden hint for mobile screens', () => {
    renderWithTheme(
      <FieldWithAsideHint
        hintText={mockHintText}
        describedById={mockDescribedById}
      >
        {MockChild}
      </FieldWithAsideHint>,
    );
    const allHints = screen.getAllByText(mockHintText);

    expect(allHints.length).toBe(3);
  });
});
