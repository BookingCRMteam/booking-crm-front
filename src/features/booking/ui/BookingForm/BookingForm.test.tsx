import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithTheme } from '@/shared/tests/renderWithProviders';

import { BookingForm } from './BookingForm';

const mockOnSubmit = jest.fn();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockHandleSubmit = jest.fn((fn) => (e: any) => {
  fn(e);
  e.preventDefault();
});

const mockUseBookingForm = {
  form: {
    register: jest.fn(() => ({})),
    control: {},
    handleSubmit: mockHandleSubmit,
    formState: { errors: {}, isSubmitting: false },
  },
  onSubmit: mockOnSubmit,
};

jest.mock('../../lib/useBookingForm', () => ({
  useBookingForm: jest.fn(() => mockUseBookingForm),
}));

jest.mock('@/shared/ui', () => ({
  PhoneInputField: ({ name }: { name: string }) => (
    <div data-testid={`${name}-input`} />
  ),
}));

describe('BookingForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseBookingForm.form.formState.errors = {};
    mockUseBookingForm.form.formState.isSubmitting = false;
  });

  it('renders all input fields and the phone field', () => {
    renderWithTheme(<BookingForm />);

    expect(screen.getByPlaceholderText(/Ім’я партнера 1/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Прізвище партнера 1/i),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ім’я партнера 2/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Прізвище партнера 2/i),
    ).toBeInTheDocument();
    expect(screen.getByTestId('phone-input')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /ПЕРЕЙТИ ДО ОПЛАТИ/i }),
    ).toBeInTheDocument();
  });

  it('calls onSubmit when submitting the form', async () => {
    renderWithTheme(<BookingForm />);
    const user = userEvent.setup(); // <-- створюємо userEvent

    const submitButton = screen.getByRole('button', {
      name: /ПЕРЕЙТИ ДО ОПЛАТИ/i,
    });
    await user.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalledWith(mockOnSubmit);
  });

  it('prevents submit when disableSubmit=true', () => {
    renderWithTheme(<BookingForm disableSubmit />);

    fireEvent.click(screen.getByRole('button', { name: /ПЕРЕЙТИ ДО ОПЛАТИ/i }));
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('disables submit button when isSubmitting=true', () => {
    mockUseBookingForm.form.formState.isSubmitting = true;

    renderWithTheme(<BookingForm />);
    const submitButton = screen.getByRole('button', {
      name: /ПЕРЕЙТИ ДО ОПЛАТИ/i,
    });
    expect(submitButton).toBeDisabled();
  });

  it('shows helper text for errors', () => {
    mockUseBookingForm.form.formState.errors = {
      firstPersonName: { message: 'Error Name 1' },
      firstPersonSurname: { message: 'Error Surname 1' },
    };

    renderWithTheme(<BookingForm />);

    expect(
      screen.getByText((content) => content.includes('Error Name 1')),
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes('Error Surname 1')),
    ).toBeInTheDocument();
  });

  it('shows helper text for all fields errors', () => {
    mockUseBookingForm.form.formState.errors = {
      firstPersonName: { message: 'Error Name 1' },
      firstPersonSurname: { message: 'Error Surname 1' },
      secondPersonName: { message: 'Error Name 2' },
      secondPersonSurname: { message: 'Error Surname 2' },
    };

    renderWithTheme(<BookingForm />);

    expect(
      screen.getByText((c) => c.includes('Error Name 1')),
    ).toBeInTheDocument();
    expect(
      screen.getByText((c) => c.includes('Error Surname 1')),
    ).toBeInTheDocument();
    expect(
      screen.getByText((c) => c.includes('Error Name 2')),
    ).toBeInTheDocument();
    expect(
      screen.getByText((c) => c.includes('Error Surname 2')),
    ).toBeInTheDocument();
  });
});
