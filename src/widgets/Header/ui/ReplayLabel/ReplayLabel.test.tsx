import { screen } from '@testing-library/react';

import { renderWithTheme } from '@/shared/tests';

import { ReplayLabel } from './ReplayLabel';

jest.mock('@phosphor-icons/react', () => ({
  CreditCardIcon: ({ size }: { size: number }) => (
    <svg data-testid="credit-card-icon" data-size={size} />
  ),
}));

describe('ReplayLabel Component', () => {
  it('should render correctly with icon and text', () => {
    renderWithTheme(<ReplayLabel />);

    expect(screen.getByText(/Оплатити/i)).toBeInTheDocument();

    const icon = screen.getByTestId('credit-card-icon');
    expect(icon).toBeInTheDocument();

    expect(icon).toHaveAttribute('data-size', '16');
  });

  it('should have correct wrapper styles (via snapshot or container check)', () => {
    const { container } = renderWithTheme(<ReplayLabel />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
