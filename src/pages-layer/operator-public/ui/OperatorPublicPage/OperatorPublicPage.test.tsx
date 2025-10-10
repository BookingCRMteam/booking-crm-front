import { ImgHTMLAttributes } from 'react';

import { render, screen } from '@testing-library/react';

import { OperatorById } from '@/entities/operator/api/types';

import { mockOperator } from '../OperatorHeader/data';
import { OperatorPublicPage } from './OperatorPublicPage';

jest.mock('next/image', () => {
  const MockImage = (props: ImgHTMLAttributes<HTMLImageElement>) => (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img {...props} alt={props.alt || 'mocked image'} />
  );
  MockImage.displayName = 'NextImage';
  return MockImage;
});

jest.mock('../OperatorHeader/OperatorHeader', () => ({
  OperatorHeader: ({ operator }: { operator: OperatorById }) => (
    <div data-testid="operator-header">
      <span data-testid="operator-name">{operator.firstName}</span>
      <span data-testid="operator-description">
        {operator.description || '—'}
      </span>
      <span data-testid="operator-philosophy">
        {operator.philosophy || '—'}
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-testid="operator-image"
        src={operator.photo || '/images/placeholder_img.png'}
        alt={operator.firstName || 'Placeholder image'}
      />
      <div data-testid="verified-badge">Верифіковано</div>
      {operator.phone && (
        <a href={`tel:${operator.phone}`} data-testid="phone-link">
          {operator.phone}
        </a>
      )}
    </div>
  ),
}));

describe('OperatorPublicPage', () => {
  it('renders operator header with all critical information', () => {
    render(<OperatorPublicPage operator={mockOperator} />);

    expect(screen.getByTestId('operator-header')).toBeInTheDocument();

    const image = screen.getByTestId('operator-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockOperator.photo);

    expect(screen.getByTestId('verified-badge')).toBeInTheDocument();

    const phoneLink = screen.getByTestId('phone-link');
    expect(phoneLink).toHaveAttribute('href', `tel:${mockOperator.phone}`);

    expect(screen.getByTestId('operator-name')).toHaveTextContent(
      mockOperator.firstName,
    );
    expect(screen.getByTestId('operator-description')).toHaveTextContent(
      mockOperator.description || '—',
    );
    expect(screen.getByTestId('operator-philosophy')).toHaveTextContent(
      mockOperator.philosophy || '—',
    );
  });

  it('renders fallbacks when fields are missing', () => {
    const incompleteOperator = {
      ...mockOperator,
      description: '',
      philosophy: '',
      photo: '',
    };
    render(<OperatorPublicPage operator={incompleteOperator} />);

    const placeholderImg = screen.getByTestId('operator-image');
    expect(placeholderImg).toHaveAttribute(
      'src',
      '/images/placeholder_img.png',
    );

    expect(screen.getByTestId('operator-description')).toHaveTextContent('—');
    expect(screen.getByTestId('operator-philosophy')).toHaveTextContent('—');

    expect(screen.getByTestId('verified-badge')).toBeInTheDocument();
  });
});
