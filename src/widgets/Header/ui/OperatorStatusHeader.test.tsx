import { renderWithTheme } from '@/shared/tests';

import { OperatorStatusHeader } from './OperatorStatusHeader';

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
    const { getByText } = renderWithTheme(
      <OperatorStatusHeader status="approved" />,
    );
    const badge = getByText('Верифіковано').parentElement;
    expect(badge).toHaveStyle({
      backgroundColor: '#d89bf2',
      color: 'rgb(0, 5, 0)',
      border: '1px solid rgb(0, 141, 136)',
    });
  });

  test('applies correct colors for "pending"', () => {
    const { getByText } = renderWithTheme(
      <OperatorStatusHeader status="pending" />,
    );
    const badge = getByText('На перевірці').parentElement;
    expect(badge).toHaveStyle({
      backgroundColor: '#83c5be',
      color: 'rgb(0, 5, 0)',
      border: '1px solid rgb(0, 141, 136)',
    });
  });

  test('applies correct colors for "rejected"', () => {
    const { getByText } = renderWithTheme(
      <OperatorStatusHeader status="rejected" />,
    );
    const badge = getByText('Відхилено').parentElement;
    expect(badge).toHaveStyle({
      backgroundColor: 'rgba(255, 221, 210, 0.5)',
      color: '#dc3545',
      border: '1px solid #e29578',
    });
  });
});
