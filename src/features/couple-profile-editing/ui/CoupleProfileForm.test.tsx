/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { createMockHandleSubmit } from '@/shared/tests';

import { useCoupleProfileForm } from '../model/useCoupleProfileForm';
import { CoupleProfileForm } from './CoupleProfileForm';

jest.mock('../model/useCoupleProfileForm');

jest.mock('@/entities/user', () => ({
  useUserQuery: jest.fn(),
}));
const mockHandleSubmit = createMockHandleSubmit();

const mockRegister = jest.fn();
const mockControl = {};
const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

jest.mock('react-hook-form', () => {
  const originalModule = jest.requireActual('react-hook-form');
  return {
    __esModule: true,
    ...originalModule,
    Controller: ({ render }: any) =>
      render({
        field: {
          value: '',
          onChange: jest.fn(),
          onBlur: jest.fn(),
          name: 'phone',
          ref: jest.fn(),
        },
        fieldState: { error: undefined },
      }),
  };
});

describe('CoupleProfileForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useCoupleProfileForm as jest.Mock).mockReturnValue({
      form: {
        handleSubmit: mockHandleSubmit,
        register: mockRegister,
        control: mockControl,
        formState: {
          errors: {},
        },
      },
      onSubmit: mockOnSubmit,
      isPending: false,
    });
  });

  it('renders all form fields', () => {
    render(<CoupleProfileForm onCancel={mockOnCancel} />);

    expect(screen.getByLabelText('Ім’я партнера 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Прізвище партнера 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Ім’я партнера 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Прізвище партнера 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Номер телефону')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Зберегти' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Скасувати' }),
    ).toBeInTheDocument();
  });

  it('calls onSubmit when the form is submitted', async () => {
    const user = userEvent.setup();
    render(<CoupleProfileForm onCancel={mockOnCancel} />);
    const submitButton = screen.getByRole('button', { name: 'Зберегти' });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalled();
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it('calls onCancel when the "Cancel" button is clicked', async () => {
    const user = userEvent.setup();
    render(<CoupleProfileForm onCancel={mockOnCancel} />);
    const cancelButton = screen.getByRole('button', { name: 'Скасувати' });
    await user.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('disables buttons when isPending is true', () => {
    (useCoupleProfileForm as jest.Mock).mockReturnValue({
      form: {
        handleSubmit: mockHandleSubmit,
        register: mockRegister,
        control: mockControl,
        formState: { errors: {} },
      },
      onSubmit: mockOnSubmit,
      isPending: true,
    });

    render(<CoupleProfileForm onCancel={mockOnCancel} />);
    const saveButton = screen.getByRole('button', { name: 'Зберегти' });
    const cancelButton = screen.getByRole('button', { name: 'Скасувати' });

    expect(saveButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });

  it('displays validation errors correctly', () => {
    (useCoupleProfileForm as jest.Mock).mockReturnValue({
      form: {
        handleSubmit: mockHandleSubmit,
        register: mockRegister,
        control: {},
        formState: {
          errors: {
            firstPersonName: { message: 'Ім’я обов’язкове 1' },
            firstPersonSurname: { message: 'Прізвище обов’язкове 1' },
            secondPersonName: { message: 'Ім’я обов’язкове 2' },
            secondPersonSurname: { message: 'Прізвище обов’язкове 2' },
          },
        },
      },
      onSubmit: mockOnSubmit,
      isPending: true,
    });

    render(<CoupleProfileForm onCancel={mockOnCancel} />);

    expect(screen.getByText('Ім’я обов’язкове 1')).toBeInTheDocument();
    expect(screen.getByText('Прізвище обов’язкове 1')).toBeInTheDocument();
    expect(screen.getByText('Ім’я обов’язкове 2')).toBeInTheDocument();
    expect(screen.getByText('Прізвище обов’язкове 2')).toBeInTheDocument();
  });
});
