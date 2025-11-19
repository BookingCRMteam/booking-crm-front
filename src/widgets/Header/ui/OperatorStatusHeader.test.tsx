import { renderWithTheme } from '@/shared/tests';
import { theme } from '@/shared/theme';

import { OperatorStatusHeader } from './OperatorStatusHeader';
import { OPERATOR_STATUS_ID } from './constants';

jest.mock('@phosphor-icons/react', () => ({
  CertificateIcon: () => <svg data-testid="certificate-icon" />,
  SpinnerIcon: () => <svg data-testid="spinner-icon" />,
  WarningCircleIcon: () => <svg data-testid="warning-icon" />,
}));

describe('OperatorStatusHeader', () => {
  test('renders "approved" state correctly', () => {
    const { getByText, getByTestId } = renderWithTheme(
      <OperatorStatusHeader status="approved" />,
    );
    expect(getByTestId('certificate-icon')).toBeInTheDocument();
    expect(getByText('Верифіковано')).toBeInTheDocument();
  });

  test('renders "pending" state correctly', () => {
    const { getByText, getByTestId } = renderWithTheme(
      <OperatorStatusHeader status="pending" />,
    );
    expect(getByTestId('spinner-icon')).toBeInTheDocument();
    expect(getByText('На перевірці')).toBeInTheDocument();
  });

  test('renders "rejected" state correctly', () => {
    const { getByText, getByTestId } = renderWithTheme(
      <OperatorStatusHeader status="rejected" />,
    );
    expect(getByTestId('warning-icon')).toBeInTheDocument();
    expect(getByText('Відхилено')).toBeInTheDocument();
  });

  test('applies correct colors for "approved"', () => {
    const { getByTestId } = renderWithTheme(
      <OperatorStatusHeader status="approved" />,
    );
    const badge = getByTestId(OPERATOR_STATUS_ID);
    expect(badge).toHaveStyle({
      backgroundColor: theme.palette.accent[3],
      color: theme.palette.common.black,
      border: `1px solid ${theme.palette.primaryExtended[700]}`,
    });
  });

  test('applies correct colors for "pending"', () => {
    const { getByTestId } = renderWithTheme(
      <OperatorStatusHeader status="pending" />,
    );
    const badge = getByTestId(OPERATOR_STATUS_ID);

    expect(badge).toHaveStyle({
      backgroundColor: theme.palette.light[300],
      color: theme.palette.common.black,
      border: `1px solid ${theme.palette.primaryExtended[700]}`,
    });
  });

  test('applies correct colors for "rejected"', () => {
    const { getByTestId } = renderWithTheme(
      <OperatorStatusHeader status="rejected" />,
    );
    const badge = getByTestId(OPERATOR_STATUS_ID);

    expect(badge).toHaveStyle({
      backgroundColor: 'rgba(255, 221, 210, 0.5)',
      color: theme.palette.error.main,
      border: `1px solid ${theme.palette.accent[1]}`,
    });
  });
});
