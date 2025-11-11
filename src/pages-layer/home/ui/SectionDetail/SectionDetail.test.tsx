import { ReactNode } from 'react';

import { render, screen } from '@testing-library/react';

import { SectionDetail } from './SectionDetail';

jest.mock('../AccentHeading/AccentHeading', () => ({
  AccentHeading: () => <div data-testid="mock-accent-heading" />,
}));

jest.mock('../SectionTitle/SectionTitle', () => ({
  SectionTitle: ({
    children,
    description,
  }: {
    children: ReactNode;
    description: string;
  }) => (
    <div data-testid="mock-section-title">
      <p>{description}</p>
      {children}
    </div>
  ),
}));

jest.mock('./DetailCard', () => ({
  DetailCard: ({ title }: { title: string }) => (
    <div data-testid="mock-detail-card">{title}</div>
  ),
}));

jest.mock('@phosphor-icons/react', () => ({
  ClockClockwiseIcon: () => <svg data-testid="icon-clock" />,
  ShieldCheckIcon: () => <svg data-testid="icon-shield" />,
  SketchLogoIcon: () => <svg data-testid="icon-sketch" />,
}));

describe('SectionDetail', () => {
  it('renders correct number of cards', () => {
    render(<SectionDetail />);
    const cards = screen.getAllByTestId('mock-detail-card');
    expect(cards).toHaveLength(3);
  });

  it('renders SectionTitle with description and AccentHeading', () => {
    render(<SectionDetail />);
    expect(screen.getByTestId('mock-section-title')).toBeInTheDocument();
    expect(screen.getByTestId('mock-accent-heading')).toBeInTheDocument();
    expect(
      screen.getByText(/Ми подбали про кожну деталь/i),
    ).toBeInTheDocument();
  });

  it('renders navigation button to catalog', () => {
    render(<SectionDetail />);
    const button = screen.getByRole('link', { name: /До каталогу/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/catalog');
  });
});
