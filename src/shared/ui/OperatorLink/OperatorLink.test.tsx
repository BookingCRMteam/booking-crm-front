import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

import { renderWithTheme } from '@/shared/tests';

import { OperatorLink, type OperatorLinkProps } from './OperatorLink';

const MOCK_PROPS_PAGE: OperatorLinkProps = {
  id: 42,
  name: 'Олена Петренко',
  photo: '/images/operator_photo.jpg',
  variant: 'page',
};

const MOCK_PROPS_CARD: OperatorLinkProps = {
  id: 101,
  name: 'Іван Коваль',
  photo: null,
  variant: 'card',
};

describe('OperatorLink', () => {
  it('should render the operator name and link introductory text', () => {
    renderWithTheme(<OperatorLink {...MOCK_PROPS_PAGE} />);

    expect(screen.getByText('Туроператор:')).toBeInTheDocument();

    expect(screen.getByText(MOCK_PROPS_PAGE.name)).toBeInTheDocument();
  });

  it('should form the correct href based on the operator ID', () => {
    renderWithTheme(<OperatorLink {...MOCK_PROPS_PAGE} />);

    const linkElement = screen.getByTestId('operator-link');

    expect(linkElement).toHaveAttribute(
      'href',
      `/catalog/operator/${MOCK_PROPS_PAGE.id}`,
    );
  });

  it('should display the provided operator photo when photo prop is present', () => {
    renderWithTheme(<OperatorLink {...MOCK_PROPS_PAGE} />);

    const image = screen.getByRole('img', { name: MOCK_PROPS_PAGE.name });

    expect(image).toHaveAttribute('src', MOCK_PROPS_PAGE.photo);
    expect(image).toHaveAttribute('width', '36');
  });

  it('should use the placeholder image when photo prop is null', () => {
    renderWithTheme(<OperatorLink {...MOCK_PROPS_CARD} />);

    const image = screen.getByRole('img', { name: MOCK_PROPS_CARD.name });

    expect(image).toHaveAttribute('src', '/images/operator_placeholder.png');
    expect(image).toHaveAttribute('width', '32');
  });

  it('should use 36x36 image size for "page" variant', () => {
    renderWithTheme(<OperatorLink {...MOCK_PROPS_PAGE} />);
    const image = screen.getByRole('img', { name: MOCK_PROPS_PAGE.name });
    expect(image).toHaveAttribute('width', '36');
    expect(image).toHaveAttribute('height', '36');
  });

  it('should use 32x32 image size for "card" variant', () => {
    renderWithTheme(<OperatorLink {...MOCK_PROPS_CARD} />);
    const image = screen.getByRole('img', { name: MOCK_PROPS_CARD.name });
    expect(image).toHaveAttribute('width', '32');
    expect(image).toHaveAttribute('height', '32');
  });
});
