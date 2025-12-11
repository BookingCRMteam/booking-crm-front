import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';

import { mockOperatorById } from '@/shared/tests';
import { theme } from '@/shared/theme';
import { formattedPhone } from '@/shared/utils';

import { OperatorHeader } from './OperatorHeader';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('OperatorHeader', () => {
  test('renders full operator info', () => {
    renderWithTheme(<OperatorHeader operator={mockOperatorById} />);

    const image = screen.getByAltText(
      `${mockOperatorById.firstName} ${mockOperatorById.lastName}`,
    );

    expect(mockOperatorById.photo).toBeTruthy();
    expect(image).toHaveAttribute('src', mockOperatorById.photo!);

    expect(
      screen.getByText(
        `${mockOperatorById.firstName} ${mockOperatorById.lastName}`,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(formattedPhone(mockOperatorById.phone)),
    ).toBeInTheDocument();
    expect(screen.getByText(mockOperatorById.description!)).toBeInTheDocument();
    expect(screen.getByText(mockOperatorById.philosophy!)).toBeInTheDocument();
  });

  test('renders placeholder image when photo is null', () => {
    const operator = { ...mockOperatorById, photo: null };
    renderWithTheme(<OperatorHeader operator={operator} />);
    expect(screen.getByAltText('Placeholder image')).toHaveAttribute(
      'src',
      '/images/operator_public_placeholder.png',
    );
  });

  test('replaces http with https', () => {
    const operator = {
      ...mockOperatorById,
      photo: 'http://example.com/photo.jpg',
    };
    renderWithTheme(<OperatorHeader operator={operator} />);
    expect(
      screen.getByAltText(
        `${mockOperatorById.firstName} ${mockOperatorById.lastName}`,
      ),
    ).toHaveAttribute('src', 'https://example.com/photo.jpg');
  });

  test('renders fallbacks when description and philosophy are missing', () => {
    const operator = {
      ...mockOperatorById,
      description: '',
      philosophy: '',
    };
    renderWithTheme(<OperatorHeader operator={operator} />);
    const fallbacks = screen.getAllByText('Не заповнено');
    expect(fallbacks).toHaveLength(2);
  });
});
