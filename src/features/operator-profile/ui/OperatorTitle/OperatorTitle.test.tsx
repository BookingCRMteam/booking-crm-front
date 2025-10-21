import { screen } from '@testing-library/react';

import type { OperatorStatus } from '@/entities/operator';

import { renderWithTheme } from '@/shared/tests';

import { OperatorTitle } from './OperatorTitle';

jest.mock('@/shared/ui', () => ({
  OperatorStatusBadge: ({
    status,
    className,
  }: {
    status: OperatorStatus;
    className?: string;
  }) => (
    <div data-testid="mock-status-badge" className={className}>
      {`Status: ${status}`}
    </div>
  ),
  Phone: ({ phone }: { phone: string }) => (
    <div data-testid="mock-phone-component">{`Phone: ${phone}`}</div>
  ),
}));

jest.mock(
  'clsx',
  () => (obj: Record<string, boolean>) =>
    Object.keys(obj)
      .filter((key) => obj[key])
      .join(' '),
);

describe('OperatorTitle Component', () => {
  const defaultProps = {
    firstName: 'Ihor',
    lastName: 'Kovalenko',
    email: 'ihor.kovalenko@example.com',
    phone: '+380501234567',
    website: 'https://ihor-kovalenko.com',
    status: 'approved' as OperatorStatus,
    isEdit: false,
  };

  test('should render all operator details in View Mode', () => {
    renderWithTheme(<OperatorTitle {...defaultProps} isEdit={false} />);

    const fullName = `${defaultProps.firstName} ${defaultProps.lastName}`;

    expect(screen.getByRole('heading', { name: fullName })).toBeInTheDocument();
    expect(screen.getByText(defaultProps.email)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.website)).toBeInTheDocument();
  });

  test('should correctly pass phone and status props to child components', () => {
    renderWithTheme(<OperatorTitle {...defaultProps} />);

    const phoneComponent = screen.getByTestId('mock-phone-component');
    expect(phoneComponent).toHaveTextContent(`Phone: ${defaultProps.phone}`);

    const badgeComponent = screen.getByTestId('mock-status-badge');
    expect(badgeComponent).toHaveTextContent(`Status: ${defaultProps.status}`);
  });
});
