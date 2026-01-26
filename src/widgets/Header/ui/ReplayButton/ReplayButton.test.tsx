import { screen } from '@testing-library/react';

import { renderWithTheme } from '@/shared/tests';

import { ReplayButton } from './ReplayButton';

jest.mock('@phosphor-icons/react', () => ({
  CreditCardIcon: ({ size }: { size: number }) => (
    <svg data-testid="credit-card-icon" data-size={size} />
  ),
}));

describe('ReplayButton Component', () => {
  it('should render correctly with icon and text', () => {
    renderWithTheme(<ReplayButton />);

    expect(screen.getByText(/Оплатити/i)).toBeInTheDocument();

    const icon = screen.getByTestId('credit-card-icon');
    expect(icon).toBeInTheDocument();

    expect(icon).toHaveAttribute('data-size', '16');
  });
});
