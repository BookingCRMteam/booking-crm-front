import { renderWithProviders } from '@/shared/tests/renderWithProviders';
import { Button } from './Button';

describe('Button', () => {
  it('renders with label', () => {
    const { getByRole } = renderWithProviders(<Button label="Click me" />);

    expect(getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();

    const { getByRole, user } = renderWithProviders(
      <Button label="Submit" onClick={handleClick} />,
    );

    const button = getByRole('button', { name: /submit/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies disabled state', () => {
    const handleClick = jest.fn();
    const { getByRole } = renderWithProviders(
      <Button label="Disabled" onClick={handleClick} disabled />,
    );

    const button = getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
  });

  it('applies custom props (e.g., variant)', () => {
    const { getByRole } = renderWithProviders(
      <Button label="Outlined" variant="outlined" />,
    );
    const button = getByRole('button', { name: /outlined/i });

    expect(button).toHaveClass('MuiButton-outlined');
  });
});
