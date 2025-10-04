import { render, screen } from '@testing-library/react';

import { UserRole } from '@/shared/types';

import HeaderPure from './HeaderPure';

const userRole: UserRole = 'traveler';

const mockUser = { userRole, firstPersonName: 'Jane' };

describe('HeaderPure UI', () => {
  it('should render UnauthorizedMenu when no user is provided', () => {
    render(
      <HeaderPure
        userRole={undefined}
        firstPersonName={undefined}
        operatorStatus={undefined}
      />,
    );

    expect(screen.queryByLabelText('user-menu')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Вхід/i })).toBeInTheDocument();
  });

  it('should render AuthorizedMenu with correct initial (J)', () => {
    render(
      <HeaderPure
        userRole={mockUser.userRole}
        firstPersonName={mockUser.firstPersonName}
      />,
    );

    const userButton = screen.getByLabelText('user-menu');
    expect(userButton).toBeInTheDocument();

    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('should render OperatorStatusDisplay when operatorStatus is approved', () => {
    render(
      <HeaderPure
        userRole={'operator'}
        firstPersonName={'Operator'}
        operatorStatus={'approved'}
      />,
    );

    expect(screen.getByText(/Туроператор/i)).toBeInTheDocument();
  });

  it('should render OperatorStatusDisplay when operatorStatus is pending', () => {
    render(
      <HeaderPure
        userRole={'operator'}
        firstPersonName={'Operator'}
        operatorStatus={'pending'}
      />,
    );

    expect(screen.queryByText(/Ваш статус на перевірці/i)).toBeInTheDocument();
  });
});
