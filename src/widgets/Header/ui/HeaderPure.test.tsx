import { renderWithTheme } from '@/shared/tests';
import { UserRole } from '@/shared/types';

import HeaderPure from './HeaderPure';

const userRole: UserRole = 'traveler';

const mockUser = { userRole, firstPersonName: 'Jane' };

describe('HeaderPure UI', () => {
  it('should render UnauthorizedMenu when no user is provided', () => {
    const { getByRole, queryByLabelText } = renderWithTheme(
      <HeaderPure
        userRole={undefined}
        firstPersonName={undefined}
        operatorStatus={undefined}
      />,
    );

    expect(queryByLabelText('user-menu')).not.toBeInTheDocument();
    expect(getByRole('link', { name: /Вхід/i })).toBeInTheDocument();
  });

  it('should render AuthorizedMenu with correct initial (J)', () => {
    const { getByLabelText, getByText } = renderWithTheme(
      <HeaderPure
        userRole={mockUser.userRole}
        firstPersonName={mockUser.firstPersonName}
      />,
    );

    const userButton = getByLabelText('user-menu');
    expect(userButton).toBeInTheDocument();

    expect(getByText('J')).toBeInTheDocument();
  });

  it('should render OperatorStatusDisplay when operatorStatus is approved', () => {
    const { getByText } = renderWithTheme(
      <HeaderPure
        userRole={'operator'}
        firstPersonName={'Operator'}
        operatorStatus={'approved'}
      />,
    );

    expect(getByText(/Верифіковано/i)).toBeInTheDocument();
  });

  it('should render OperatorStatusDisplay when operatorStatus is pending', () => {
    const { getByText } = renderWithTheme(
      <HeaderPure
        userRole={'operator'}
        firstPersonName={'Operator'}
        operatorStatus={'pending'}
      />,
    );

    expect(getByText(/На перевірці/i)).toBeInTheDocument();
  });
  it('should render OperatorStatusDisplay when operatorStatus is rejected', () => {
    const { getByText } = renderWithTheme(
      <HeaderPure
        userRole={'operator'}
        firstPersonName={'Operator'}
        operatorStatus={'rejected'}
      />,
    );

    expect(getByText(/Відхилено/i)).toBeInTheDocument();
  });
});
