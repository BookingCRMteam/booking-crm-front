import { ReactNode } from 'react';

import { render, screen } from '@testing-library/react';

import { useGetOperatorPopularQuery } from '@/entities/operator';

import { Operators } from './Operators';

jest.mock('@/entities/operator', () => ({
  useGetOperatorPopularQuery: jest.fn(),
}));

jest.mock('../AccentHeading/AccentHeading', () => ({
  AccentHeading: () => <div data-testid="accent-heading" />,
}));

jest.mock('../SectionTitle/SectionTitle', () => ({
  SectionTitle: ({
    description,
    children,
  }: {
    children: ReactNode;
    description: string;
  }) => (
    <div data-testid="section-title">
      {children}
      <p>{description}</p>
    </div>
  ),
}));

jest.mock('@/shared/ui', () => ({
  OperatorCardSkeleton: () => <div data-testid="skeleton" />,
}));

jest.mock('./OperatorCard', () => ({
  OperatorCard: ({ firstName }: { firstName: string }) => (
    <div data-testid="operator-card">{firstName}</div>
  ),
}));

const mockUseQuery = useGetOperatorPopularQuery as jest.Mock;

describe('Operators section', () => {
  it('renders skeletons when loading', () => {
    mockUseQuery.mockReturnValue({
      isLoading: true,
      isError: false,
      isSuccess: false,
    });
    render(<Operators />);
    expect(screen.getAllByTestId('skeleton')).toHaveLength(3);
  });

  it('renders skeletons when error', () => {
    mockUseQuery.mockReturnValue({
      isLoading: false,
      isError: true,
      isSuccess: false,
    });
    render(<Operators />);
    expect(screen.getAllByTestId('skeleton')).toHaveLength(3);
  });

  it('renders operator cards when data is fetched', () => {
    const mockData = [
      { id: 1, firstName: 'Oleh', lastName: 'Ivanov' },
      { id: 2, firstName: 'Maria', lastName: 'Kovalenko' },
    ];
    mockUseQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      isSuccess: true,
      data: mockData,
    });
    render(<Operators />);
    expect(screen.getAllByTestId('operator-card')).toHaveLength(2);
    expect(screen.getByText('Oleh')).toBeInTheDocument();
    expect(screen.getByText('Maria')).toBeInTheDocument();
  });

  it('always renders SectionTitle and AccentHeading', () => {
    mockUseQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      isSuccess: true,
      data: [],
    });
    render(<Operators />);
    expect(screen.getByTestId('section-title')).toBeInTheDocument();
    expect(screen.getByTestId('accent-heading')).toBeInTheDocument();
  });
});
