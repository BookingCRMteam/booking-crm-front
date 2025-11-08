import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';

import { theme } from '@/shared/theme';
import { formattedPhone } from '@/shared/utils';

import { mockOperator } from '../../mocks/data';
import { OperatorHeader } from './OperatorHeader';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('OperatorHeader', () => {
  test('renders full operator info', () => {
    renderWithTheme(<OperatorHeader operator={mockOperator} />);

    const image = screen.getByAltText(
      `${mockOperator.firstName} ${mockOperator.lastName}`,
    );
    expect(image).toHaveAttribute('src', mockOperator.photo!);

    expect(
      screen.getByText(`${mockOperator.firstName} ${mockOperator.lastName}`),
    ).toBeInTheDocument();

    expect(
      screen.getByText(formattedPhone(mockOperator.phone)),
    ).toBeInTheDocument();
    expect(screen.getByText(mockOperator.description!)).toBeInTheDocument();
    expect(screen.getByText(mockOperator.philosophy!)).toBeInTheDocument();
  });

  test('renders placeholder image when photo is null', () => {
    const operator = { ...mockOperator, photo: null };
    renderWithTheme(<OperatorHeader operator={operator} />);
    expect(screen.getByAltText('Placeholder image')).toHaveAttribute(
      'src',
      '/images/operator_public_placeholder.png',
    );
  });

  test('replaces http with https', () => {
    const operator = { ...mockOperator, photo: 'http://example.com/photo.jpg' };
    renderWithTheme(<OperatorHeader operator={operator} />);
    expect(
      screen.getByAltText(`${mockOperator.firstName} ${mockOperator.lastName}`),
    ).toHaveAttribute('src', 'https://example.com/photo.jpg');
  });

  test('renders fallbacks when description and philosophy are missing', () => {
    const operator = { ...mockOperator, description: null, philosophy: null };
    renderWithTheme(<OperatorHeader operator={operator} />);
    const fallbacks = screen.getAllByText('Не заповнено');
    expect(fallbacks).toHaveLength(2);
  });
});
