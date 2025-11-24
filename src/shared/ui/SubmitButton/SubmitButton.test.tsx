import { renderWithTheme } from '@/shared/tests';

import { SubmitButton } from './SubmitButton';

const defaultProps = {
  textIdle: 'Відправити',
  textLoading: 'Надсилаємо...',
  textSuccess: 'Успішно!',
  isLoading: false,
  isSuccess: false,
};

jest.mock('@phosphor-icons/react', () => ({
  CheckFatIcon: () => <svg data-testid="check-fat-icon" />,
}));

describe('SubmitButton', () => {
  it('should render the idle state correctly', () => {
    const { getByText, queryByRole } = renderWithTheme(
      <SubmitButton {...defaultProps} />,
    );

    const button = getByText('Відправити');
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    expect(queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('should render the loading state correctly', () => {
    const { getByText, getByRole, queryByText } = renderWithTheme(
      <SubmitButton {...defaultProps} isLoading />,
    );
    const button = getByRole('button');

    expect(button).toBeDisabled();
    expect(getByText('Надсилаємо...')).toBeInTheDocument();
    expect(getByRole('progressbar')).toBeInTheDocument();
    expect(queryByText('Відправити')).not.toBeInTheDocument();
  });

  it('should render the success state correctly', () => {
    const { getByText, getByTestId, queryByRole } = renderWithTheme(
      <SubmitButton {...defaultProps} isSuccess />,
    );

    const button = getByText('Успішно!');
    expect(button).toBeInTheDocument();

    expect(button).toBeDisabled();

    const icon = getByTestId('check-fat-icon');
    expect(icon).toBeInTheDocument();
    expect(queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('should be disabled when props.disabled is true in idle state', () => {
    const { getByRole, getByText } = renderWithTheme(
      <SubmitButton {...defaultProps} disabled />,
    );
    expect(getByRole('button')).toBeDisabled();
    expect(getByText('Відправити')).toBeInTheDocument();
  });
});
