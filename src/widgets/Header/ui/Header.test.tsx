import { render, screen } from '@testing-library/react';

import { useUserBookingsQuery } from '@/entities/booking';
import { useOperatorQuery } from '@/entities/operator';
import { useUserQuery } from '@/entities/user';

import { Header } from './Header';
import type { HeaderPureProps } from './HeaderPure/types';

jest.mock('@/entities/user');
jest.mock('@/entities/operator');
jest.mock('@/entities/booking');

jest.mock('./HeaderPure/HeaderPure', () => {
  return ({
    firstPersonName,
    isPendingPayment,
    operatorStatus,
    userRole,
  }: HeaderPureProps) => (
    <div
      data-testid="header-pure"
      data-name={firstPersonName}
      data-pending={isPendingPayment}
      data-op-status={operatorStatus}
      data-role={userRole}
    />
  );
});

describe('Header Container', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should pass operator name as priority over user name', () => {
    (useUserQuery as jest.Mock).mockReturnValue({
      data: { firstPersonName: 'User Name', role: 'traveler' },
    });
    (useOperatorQuery as jest.Mock).mockReturnValue({
      data: { firstName: 'Operator Name', status: 'approved' },
    });
    (useUserBookingsQuery as jest.Mock).mockReturnValue({
      data: [],
    });

    render(<Header />);

    const header = screen.getByTestId('header-pure');

    expect(header).toHaveAttribute('data-name', 'Operator Name');
    expect(header).toHaveAttribute('data-op-status', 'approved');
    expect(header).toHaveAttribute('data-role', 'traveler');
    expect(header).toHaveAttribute('data-pending', 'false');
  });

  it('should correctly calculate isPendingPayment when bookings exist', () => {
    (useUserQuery as jest.Mock).mockReturnValue({ data: null });
    (useOperatorQuery as jest.Mock).mockReturnValue({ data: null });
    (useUserBookingsQuery as jest.Mock).mockReturnValue({
      data: {
        data: [{ id: 1 }, { id: 2 }],
      },
    });

    render(<Header />);

    const header = screen.getByTestId('header-pure');
    expect(header).toHaveAttribute('data-pending', 'true');
  });

  it('should use user name if operator data is missing', () => {
    (useUserQuery as jest.Mock).mockReturnValue({
      data: { firstPersonName: 'Only User Name', role: 'traveler' },
    });
    (useOperatorQuery as jest.Mock).mockReturnValue({ data: null });
    (useUserBookingsQuery as jest.Mock).mockReturnValue({ data: [] });

    render(<Header />);

    const header = screen.getByTestId('header-pure');

    expect(header).toHaveAttribute('data-name', 'Only User Name');
    expect(header).toHaveAttribute('data-role', 'traveler');
    expect(header).not.toHaveAttribute('data-op-status');
  });

  it('should handle completely empty data states', () => {
    (useUserQuery as jest.Mock).mockReturnValue({ data: null });
    (useOperatorQuery as jest.Mock).mockReturnValue({ data: null });
    (useUserBookingsQuery as jest.Mock).mockReturnValue({ data: null });

    render(<Header />);

    const header = screen.getByTestId('header-pure');

    expect(header).toHaveAttribute('data-pending', 'false');
    expect(header).not.toHaveAttribute('data-name');
  });
});
