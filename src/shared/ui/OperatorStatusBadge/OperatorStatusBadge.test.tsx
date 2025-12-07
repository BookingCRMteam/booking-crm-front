import { OperatorStatus } from '@/entities/operator';

import { renderWithTheme } from '@/shared/tests';

import { OperatorStatusBadge } from './OperatorStatusBadge';

jest.mock('@phosphor-icons/react', () => ({
  CertificateIcon: () => <svg data-testid="certificate-icon" />,
  WarningCircleIcon: () => <svg data-testid="warning-icon" />,
  SpinnerIcon: () => <svg data-testid="spinner-icon" />,
}));

describe('OperatorStatusBadge Component', () => {
  const testCases: {
    status: OperatorStatus;
    expectedText: string;
    expectedIconTestId: string;
  }[] = [
    {
      status: 'approved',
      expectedText: 'Верифіковано',
      expectedIconTestId: 'certificate-icon',
    },
    {
      status: 'pending',
      expectedText: 'На перевірці',
      expectedIconTestId: 'spinner-icon',
    },
    {
      status: 'rejected',
      expectedText: 'Відхилено',
      expectedIconTestId: 'warning-icon',
    },
  ];

  test.each(testCases)(
    'should render correctly for status: $status with correct text and icon',
    ({ status, expectedText, expectedIconTestId }) => {
      const { getByText, getByTestId, queryByTestId } = renderWithTheme(
        <OperatorStatusBadge status={status} />,
      );

      expect(getByText(expectedText)).toBeInTheDocument();
      const icon = getByTestId(expectedIconTestId);
      expect(icon).toBeInTheDocument();

      testCases.forEach((tc) => {
        if (tc.expectedIconTestId !== expectedIconTestId) {
          expect(queryByTestId(tc.expectedIconTestId)).not.toBeInTheDocument();
        }
      });
    },
  );

  test('should pass the className prop to the root element', () => {
    const customClass = 'test-override-class';
    const { container } = renderWithTheme(
      <OperatorStatusBadge status="approved" className={customClass} />,
    );

    expect(container.firstChild).toHaveClass(customClass);
  });
});
