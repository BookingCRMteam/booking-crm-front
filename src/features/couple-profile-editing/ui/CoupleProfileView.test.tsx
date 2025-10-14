import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useUserQuery } from '@/entities/user';

import { getCoupleProfileData } from '../model/getCoupleProfileData';
import { CoupleProfileView } from './CoupleProfileView';
import { UserInfo, UserInfoProps } from './UserInfo';

jest.mock('@/entities/user', () => ({
  useUserQuery: jest.fn(),
}));
const mockUseUserQuery = useUserQuery as jest.Mock;

jest.mock('../model/getCoupleProfileData', () => ({
  getCoupleProfileData: jest.fn((user) => ({
    firstPersonName: user.firstPersonName,
    firstPersonSurname: user.firstPersonSurname,
    secondPersonName: user.secondPersonName,
    secondPersonSurname: user.secondPersonSurname,
    phone: user.phone,
  })),
}));
const mockGetCoupleProfileData = getCoupleProfileData as jest.Mock;

const mockUser = {
  firstPersonName: 'Іван',
  firstPersonSurname: 'Коваленко',
  secondPersonName: 'Марія',
  secondPersonSurname: 'Петренко',
  phone: '+380501112233',
  email: 'test@couple.ua',
};

describe('UserInfo', () => {
  const props: UserInfoProps = {
    firstPersonName: 'Іван',
    firstPersonSurname: 'Іваненко',
    secondPersonName: 'Марія',
    secondPersonSurname: 'Марієнко',
    phone: '+380991234567',
  };

  it('renders full names and phone number correctly', () => {
    render(<UserInfo {...props} />);

    expect(
      screen.getByText('Іван Іваненко та Марія Марієнко'),
    ).toBeInTheDocument();

    expect(screen.getByText(props.phone)).toBeInTheDocument();

    const phoneElement = screen.getByText(props.phone);
    expect(phoneElement.closest('div')).toHaveStyle('display: flex');
  });
});

describe('CoupleProfileView', () => {
  const mockOnEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading message when isLoading is true', () => {
    mockUseUserQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    render(<CoupleProfileView onEdit={mockOnEdit} />);

    expect(screen.getByText('Завантаження...')).toBeInTheDocument();
    expect(screen.queryByTestId('edit-button')).not.toBeInTheDocument();
  });

  it('shows error message when there is an error', () => {
    mockUseUserQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('API Error'),
    });

    render(<CoupleProfileView onEdit={mockOnEdit} />);

    expect(
      screen.getByText('Помилка завантаження профілю'),
    ).toBeInTheDocument();
    expect(screen.queryByTestId('edit-button')).not.toBeInTheDocument();
  });

  it('shows "Profile not found" message when user is null', () => {
    mockUseUserQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    render(<CoupleProfileView onEdit={mockOnEdit} />);

    expect(screen.getByText('Профіль не знайдено')).toBeInTheDocument();
    expect(screen.queryByTestId('edit-button')).not.toBeInTheDocument();
  });

  it('renders full profile (UserInfo) and email when all data is available', () => {
    mockGetCoupleProfileData.mockReturnValue(mockUser);
    mockUseUserQuery.mockReturnValue({
      data: mockUser,
      isLoading: false,
      error: null,
    });

    render(<CoupleProfileView onEdit={mockOnEdit} />);

    expect(screen.getByTestId('user-info')).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(
      screen.queryByTestId('incomplete-profile-message'),
    ).not.toBeInTheDocument();
  });

  it('shows incomplete profile message when phone is missing', () => {
    const incompleteUser = { ...mockUser, phone: '' };
    mockUseUserQuery.mockReturnValue({
      data: incompleteUser,
      isLoading: false,
      error: null,
    });

    render(<CoupleProfileView onEdit={mockOnEdit} />);

    expect(
      screen.getByTestId('incomplete-profile-message'),
    ).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.queryByTestId('user-info')).not.toBeInTheDocument();
  });

  it('calls onEdit when the "Edit" button is clicked', async () => {
    mockUseUserQuery.mockReturnValue({
      data: mockUser,
      isLoading: false,
      error: null,
    });

    render(<CoupleProfileView onEdit={mockOnEdit} />);

    const editButton = screen.getByTestId('edit-button');
    await userEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });
});
