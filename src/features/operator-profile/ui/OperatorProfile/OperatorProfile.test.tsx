import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useOperatorQuery } from '@/entities/operator';

import { mockOperator } from '@/jest/fixtures/operatorMocks';

import { OperatorProfile } from './OperatorProfile';

jest.mock('@/entities/operator', () => ({
  useOperatorQuery: jest.fn(),
}));

jest.mock('../OperatorPhilosophy/OperatorPhilosophy', () => ({
  OperatorPhilosophy: () => <div data-testid="philosophy-component"></div>,
}));
jest.mock('../OperatorProfileHeader/OperatorProfileHeader', () => ({
  OperatorProfileHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="header-component">{children}</div>
  ),
}));
jest.mock('../OperatorTitle/OperatorTitle', () => ({
  OperatorTitle: ({ firstName }: { firstName: string }) => (
    <p data-testid="title-component">{firstName}</p>
  ),
}));

jest.mock('../OperatorProfileInfo/OperatorProfileInfo', () => ({
  OperatorProfileInfo: ({
    onEdit,
    children,
  }: {
    onEdit: () => void;
    children: React.ReactNode;
  }) => (
    <div data-testid="profile-info">
      {children}
      <button onClick={onEdit} data-testid="mock-edit-button">
        Редагувати
      </button>
    </div>
  ),
}));

jest.mock('../OperatorProfileEdit/OperatorProfileEdit', () => ({
  OperatorProfileEdit: ({ onCancel }: { onCancel: () => void }) => (
    <div data-testid="profile-edit">
      Режим редагування
      <button onClick={onCancel} data-testid="mock-cancel-button">
        Скасувати
      </button>
    </div>
  ),
}));

describe('OperatorProfile', () => {
  beforeEach(() => {
    (useOperatorQuery as jest.Mock).mockReturnValue({
      data: mockOperator,
      isLoading: false,
    });
  });

  test('should render View Mode by default when operator data is present', () => {
    render(<OperatorProfile />);

    expect(
      screen.getByRole('heading', { name: /Інформація про мене/i }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('profile-info')).toBeInTheDocument();

    expect(screen.queryByTestId('profile-edit')).not.toBeInTheDocument();

    expect(screen.getByTestId('mock-next-image')).toBeInTheDocument();
    expect(screen.getByTestId('title-component')).toBeInTheDocument();
    expect(screen.getByTestId('philosophy-component')).toBeInTheDocument();
  });

  test('should switch to Edit Mode when the "Редагувати" button is clicked', async () => {
    const user = userEvent.setup();
    render(<OperatorProfile />);

    expect(screen.getByTestId('profile-info')).toBeInTheDocument();
    expect(screen.queryByTestId('profile-edit')).not.toBeInTheDocument();

    const editButton = screen.getByTestId('mock-edit-button');
    await user.click(editButton);

    expect(screen.queryByTestId('profile-info')).not.toBeInTheDocument();
    expect(screen.getByTestId('profile-edit')).toBeInTheDocument();
  });

  test('should return to View Mode when onCancel is called in Edit Mode', async () => {
    const user = userEvent.setup();
    render(<OperatorProfile />);

    await user.click(screen.getByTestId('mock-edit-button'));
    expect(screen.getByTestId('profile-edit')).toBeInTheDocument();

    const cancelButton = screen.getByTestId('mock-cancel-button');
    await user.click(cancelButton);

    expect(screen.getByTestId('profile-info')).toBeInTheDocument();
    expect(screen.queryByTestId('profile-edit')).not.toBeInTheDocument();
  });

  test('should render a Loading indicator when data is loading and operator data is null', () => {
    (useOperatorQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(<OperatorProfile />);

    expect(
      screen.getByRole('heading', { name: /Інформація про мене/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByTestId('profile-info')).not.toBeInTheDocument();
    expect(screen.queryByTestId('profile-edit')).not.toBeInTheDocument();
  });

  test('should render an Error message when data fetching fails', () => {
    (useOperatorQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<OperatorProfile />);

    expect(
      screen.getByRole('heading', { name: /Інформація про мене/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Error loading operator data')).toBeInTheDocument();
    expect(screen.queryByTestId('profile-info')).not.toBeInTheDocument();
    expect(screen.queryByTestId('profile-edit')).not.toBeInTheDocument();
  });
});
