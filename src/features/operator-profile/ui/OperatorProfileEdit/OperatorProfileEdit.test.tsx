/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from 'react';

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { createMockHandleSubmit, renderWithTheme } from '@/shared/tests';

import { mockOperator } from '@/jest/fixtures/operatorMocks';

import { useOperatorUpdateProfile } from '../../model/useOperatorProfile';
import { OperatorProfileEdit } from './OperatorProfileEdit';

jest.mock('../ImagesInput/ImagesInput', () => ({
  __esModule: true,
  ImagesInput: jest.fn(({ onDeleteFlagChange, initialPreviewUrl }) => (
    <div data-testid="images-input">
      <button
        type="button"
        data-testid="mock-delete-button"
        onClick={() => onDeleteFlagChange(true)}
      >
        Delete Photo Mock
      </button>
      {initialPreviewUrl && (
        <p data-testid="initial-url">{initialPreviewUrl}</p>
      )}
    </div>
  )),
}));

jest.mock('../OperatorProfileHeader/OperatorProfileHeader', () => ({
  OperatorProfileHeader: ({ children }: { children: ReactNode }) => (
    <div data-testid="header">{children}</div>
  ),
}));

jest.mock('../FieldWithAsideHint/FieldWithAsideHint', () => ({
  FieldWithAsideHint: ({ children }: { children: ReactNode }) => (
    <div data-testid="field-with-aside-hint">{children}</div>
  ),
}));

jest.mock('../OperatorTitle/OperatorTitle', () => ({
  OperatorTitle: ({ firstName }: { firstName: string }) => (
    <p data-testid="title-component">{firstName}</p>
  ),
}));

jest.mock('../../model/useOperatorProfile');

jest.mock('@/entities/user', () => ({
  useUserQuery: jest.fn(),
}));

const mockHandleSubmit = createMockHandleSubmit();

const mockRegister = jest.fn();
const mockSetValue = jest.fn();
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
describe('OperatorProfileEdit', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useOperatorUpdateProfile as jest.Mock).mockReturnValue({
      form: {
        handleSubmit: mockHandleSubmit,
        register: mockRegister,
        control: mockControl,
        setValue: mockSetValue,
        formState: {
          errors: {},
        },
      },
      operator: mockOperator,
      onSubmit: mockOnSubmit,
      isPending: false,
    });
  });

  it('renders all form fields', () => {
    renderWithTheme(<OperatorProfileEdit onCancel={mockOnCancel} />);

    expect(screen.getByPlaceholderText('Про себе')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Моя філософія')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Зберегти' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Скасувати' }),
    ).toBeInTheDocument();
  });

  it('calls onSubmit when the form is submitted', async () => {
    const user = userEvent.setup();
    renderWithTheme(<OperatorProfileEdit onCancel={mockOnCancel} />);
    const submitButton = screen.getByRole('button', { name: 'Зберегти' });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalled();
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it('calls onCancel when the "Cancel" button is clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(<OperatorProfileEdit onCancel={mockOnCancel} />);
    const cancelButton = screen.getByRole('button', { name: 'Скасувати' });
    await user.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('disables buttons when isPending is true', () => {
    (useOperatorUpdateProfile as jest.Mock).mockReturnValue({
      form: {
        handleSubmit: mockHandleSubmit,
        register: mockRegister,
        control: mockControl,
        formState: { errors: {} },
      },
      onSubmit: mockOnSubmit,
      isPending: true,
    });

    renderWithTheme(<OperatorProfileEdit onCancel={mockOnCancel} />);
    const saveButton = screen.getByRole('button', { name: 'Зберегти' });
    const cancelButton = screen.getByRole('button', { name: 'Скасувати' });

    expect(saveButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });

  it('displays validation errors correctly', () => {
    (useOperatorUpdateProfile as jest.Mock).mockReturnValue({
      form: {
        handleSubmit: mockHandleSubmit,
        register: mockRegister,
        control: {},
        formState: {
          errors: {
            philosophy: { message: 'Максимальна довжина — 500 символів' },
            description: { message: 'Максимальна довжина — 1000 символів' },
          },
        },
      },
      onSubmit: mockOnSubmit,
      isPending: true,
    });

    renderWithTheme(<OperatorProfileEdit onCancel={mockOnCancel} />);

    expect(
      screen.getByText('Максимальна довжина — 500 символів'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Максимальна довжина — 1000 символів'),
    ).toBeInTheDocument();
  });

  it('calls setValue with correct arguments when photo is marked for deletion', async () => {
    const user = userEvent.setup();
    renderWithTheme(<OperatorProfileEdit onCancel={mockOnCancel} />);

    const deleteButton = screen.getByTestId('mock-delete-button');

    await user.click(deleteButton);

    expect(mockSetValue).toHaveBeenCalledTimes(1);
    expect(mockSetValue).toHaveBeenCalledWith('removePhoto', true, {
      shouldDirty: true,
    });
  });
});
