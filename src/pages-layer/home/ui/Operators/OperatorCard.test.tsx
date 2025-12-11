import { renderWithTheme } from '@/shared/tests';

import { OperatorCard } from './OperatorCard';
import type { OperatorCardProps } from './types';

jest.mock('@/shared/ui', () => ({
  OperatorStatusBadge: jest.fn(() => <div data-testid="status-badge" />),
}));

describe('OperatorCard', () => {
  const baseProps: OperatorCardProps = {
    id: 5,
    firstName: 'Ivan',
    lastName: 'Petrenko',
    status: 'approved',
    description: 'Мандрівник, який створює унікальні подорожі.',
    activeToursCount: 7,
    photo: '/test_photo.png',
  };

  it('renders all main elements', () => {
    const { getByText, getByTestId, getByRole } = renderWithTheme(
      <OperatorCard {...baseProps} />,
    );

    expect(
      getByRole('heading', { name: /Ivan.*Petrenko/i }),
    ).toBeInTheDocument();
    expect(getByText(/Актуальні подорожі/)).toHaveTextContent('7');
    expect(getByTestId('status-badge')).toBeInTheDocument();
    expect(getByRole('link', { name: /Переглянути/i })).toBeInTheDocument();
    expect(getByText(baseProps.description!)).toBeInTheDocument();
    const img = getByRole('img') as HTMLImageElement;
    expect(img.src).toContain(baseProps.photo!);
  });

  it('uses placeholder image when no photo provided', () => {
    const { getByRole } = renderWithTheme(
      <OperatorCard {...baseProps} photo={null} />,
    );
    const img = getByRole('img') as HTMLImageElement;
    expect(img.src).toContain('operator_placeholder.png');
  });

  it('links to correct operator page', () => {
    const { getByRole } = renderWithTheme(<OperatorCard {...baseProps} />);
    const link = getByRole('link', { name: /Переглянути/i });
    expect(link).toHaveAttribute('href', '/catalog/operator/5');
  });

  it('handles null description gracefully', () => {
    const { getByText } = renderWithTheme(
      <OperatorCard {...baseProps} description={null} />,
    );
    expect(() => getByText('null')).toThrow();
  });
});
