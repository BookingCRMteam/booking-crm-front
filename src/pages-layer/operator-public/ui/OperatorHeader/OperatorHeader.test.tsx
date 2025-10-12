import { ImgHTMLAttributes } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';

import { theme } from '@/shared/theme';
import { formattedPhone } from '@/shared/utils';

import { mockOperator } from '../../mocks/data';
import { OperatorHeader } from './OperatorHeader';

jest.mock('next/image', () => {
  const MockImage = (props: ImgHTMLAttributes<HTMLImageElement>) => (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img {...props} alt={props.alt || 'mocked image'} />
  );
  MockImage.displayName = 'NextImage';
  return MockImage;
});

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('OperatorHeader', () => {
  test('renders full operator info', () => {
    renderWithTheme(<OperatorHeader operator={mockOperator} />);

    const image = screen.getByAltText(
      `${mockOperator.firstName} ${mockOperator.lastName}`,
    );
    expect(image).toHaveAttribute('src', mockOperator.photo);

    expect(
      screen.getByText(`${mockOperator.firstName} ${mockOperator.lastName}`),
    ).toBeInTheDocument();

    const phoneLink = screen.getByRole('link', {
      name: formattedPhone(mockOperator.phone),
    });
    expect(phoneLink).toHaveAttribute('href', `tel:${mockOperator.phone}`);

    expect(screen.getByText(mockOperator.description!)).toBeInTheDocument();
    expect(screen.getByText(mockOperator.philosophy!)).toBeInTheDocument();
  });

  test('renders placeholder image when photo is null', () => {
    const operator = { ...mockOperator, photo: null };
    renderWithTheme(<OperatorHeader operator={operator} />);
    expect(screen.getByAltText('Placeholder image')).toHaveAttribute(
      'src',
      '/images/placeholder_img.png',
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
    const fallbacks = screen.getAllByText('—');
    expect(fallbacks).toHaveLength(2);
  });
});
