/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import '@testing-library/jest-dom';

import { OperatorStatus } from '@/entities/operator';

import { renderWithProviders } from '@/shared/tests';

import { OperatorStatusBadge } from './OperatorStatusBadge';

jest.mock('@phosphor-icons/react', () => ({
  CertificateIcon: (props: any) => (
    <svg data-testid="certificate-icon" {...props} />
  ),
  ClockIcon: (props: any) => <svg data-testid="clock-icon" {...props} />,
  ProhibitInsetIcon: (props: any) => (
    <svg data-testid="prohibit-icon" {...props} />
  ),
}));

describe('OperatorStatusBadge Component', () => {
  const testCases: {
    status: OperatorStatus;
    expectedText: string;
    expectedIconTestId: string;
    expectedAccentColor: number;
    expectedRotation: string;
  }[] = [
    {
      status: 'approved',
      expectedText: 'Верифіковано',
      expectedIconTestId: 'certificate-icon',
      expectedAccentColor: 3,
      expectedRotation: '0',
    },
    {
      status: 'pending',
      expectedText: 'На перевірці',
      expectedIconTestId: 'clock-icon',
      expectedAccentColor: 2,
      expectedRotation: '0',
    },
    {
      status: 'rejected',
      expectedText: 'Відхилено',
      expectedIconTestId: 'prohibit-icon',
      expectedAccentColor: 1,
      expectedRotation: '-45deg',
    },
  ];

  test.each(testCases)(
    'should render correctly for status: $status with correct text and icon',
    ({ status, expectedText, expectedIconTestId, expectedRotation }) => {
      const { getByText, getByTestId, queryByTestId } = renderWithProviders(
        <OperatorStatusBadge status={status} />,
      );

      expect(getByText(expectedText)).toBeInTheDocument();
      const icon = getByTestId(expectedIconTestId);
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute(
        'style',
        expect.stringContaining(`rotate: ${expectedRotation}`),
      );

      testCases.forEach((tc) => {
        if (tc.expectedIconTestId !== expectedIconTestId) {
          expect(queryByTestId(tc.expectedIconTestId)).not.toBeInTheDocument();
        }
      });
    },
  );

  test('should pass the className prop to the root element', () => {
    const customClass = 'test-override-class';
    const { container } = renderWithProviders(
      <OperatorStatusBadge status="approved" className={customClass} />,
    );

    expect(container.firstChild).toHaveClass(customClass);
  });
});
