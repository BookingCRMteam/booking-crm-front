import { waitFor } from '@testing-library/react';

import { renderWithTheme } from '@/shared/tests';

import { useOperatorOnboarding } from '../model/useOperatorOnboarding';
import { OperatorOnboardingForm } from './OperatorOnboardingForm';
import {
  FORM_CHECKBOX_LABEL,
  FORM_DESCRIPTION,
  FORM_FIRST_NAME_LABEL,
  FORM_LAST_NAME_LABEL,
  FORM_PHONE_PLACEHOLDER,
  FORM_TITLE,
  FORM_WEBSITE_LABEL,
} from './constants';

jest.mock('../model/useOperatorOnboarding');
jest.mock('@/entities/user', () => ({
  useUserQuery: jest.fn(),
}));

jest.mock('@/shared/ui', () => ({
  SubmitButton: jest.fn(({ isSuccess, disabled, ...props }) => (
    <button
      data-testid="submit-button"
      type="submit"
      disabled={isSuccess || disabled}
      {...props}
    >
      Submit
    </button>
  )),
  CheckboxSmall: jest.fn((props) => <input type="checkbox" {...props} />),
  PhoneInputField: jest.fn(({ placeholder }) => (
    <input placeholder={placeholder} data-testid="phone-input" />
  )),
}));

const mockHandleSubmit = jest.fn();
const mockRegister = jest.fn((name) => ({ name, onChange: jest.fn() }));
const mockControl = {};
const mockOnSubmit = jest.fn();

describe('OperatorOnboardingForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockHandleSubmit.mockImplementation((cb) => (e: any) => {
      e?.preventDefault?.();
      return cb();
    });

    (useOperatorOnboarding as jest.Mock).mockReturnValue({
      form: {
        handleSubmit: mockHandleSubmit,
        register: mockRegister,
        control: mockControl,
        formState: {
          errors: {},
          isValid: true,
        },
      },
      onSubmit: mockOnSubmit,
      isPending: false,
    });
  });

  it('renders all static texts and inputs', () => {
    const { getByText, getByLabelText, getByPlaceholderText, getByTestId } =
      renderWithTheme(<OperatorOnboardingForm />);

    expect(getByText(FORM_TITLE)).toBeInTheDocument();
    expect(getByText(FORM_DESCRIPTION)).toBeInTheDocument();
    expect(getByLabelText(FORM_FIRST_NAME_LABEL)).toBeInTheDocument();
    expect(getByLabelText(FORM_LAST_NAME_LABEL)).toBeInTheDocument();
    expect(getByPlaceholderText(FORM_PHONE_PLACEHOLDER)).toBeInTheDocument();
    expect(getByLabelText(FORM_WEBSITE_LABEL)).toBeInTheDocument();
    expect(getByText(FORM_CHECKBOX_LABEL)).toBeInTheDocument();
    expect(getByTestId('submit-button')).toBeInTheDocument();
  });

  it('calls handleSubmit and onSubmit when form is submitted', async () => {
    const { user, getByTestId } = renderWithTheme(<OperatorOnboardingForm />);

    const submitButton = getByTestId('submit-button');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('disables submit button when form is invalid', () => {
    (useOperatorOnboarding as jest.Mock).mockReturnValueOnce({
      form: {
        handleSubmit: mockHandleSubmit,
        register: mockRegister,
        control: mockControl,
        formState: {
          errors: {},
          isValid: false,
        },
      },
      onSubmit: mockOnSubmit,
      isPending: false,
    });

    const { getByTestId } = renderWithTheme(<OperatorOnboardingForm />);
    expect(getByTestId('submit-button')).toBeDisabled();
  });

  it('disables submit button when form is pending', () => {
    (useOperatorOnboarding as jest.Mock).mockReturnValueOnce({
      form: {
        handleSubmit: mockHandleSubmit,
        register: mockRegister,
        control: mockControl,
        formState: {
          errors: {},
          isValid: true,
        },
      },
      onSubmit: mockOnSubmit,
      isPending: true,
    });

    const { getByTestId } = renderWithTheme(<OperatorOnboardingForm />);
    expect(getByTestId('submit-button')).toBeDisabled();
  });

  it('renders validation errors when present', () => {
    (useOperatorOnboarding as jest.Mock).mockReturnValueOnce({
      form: {
        handleSubmit: mockHandleSubmit,
        register: mockRegister,
        control: mockControl,
        formState: {
          errors: {
            firstName: { message: 'First name is required' },
            lastName: { message: 'Last name is required' },
            website: { message: 'Website is required' },
          },
          isValid: false,
        },
      },
      onSubmit: mockOnSubmit,
      isPending: false,
    });

    const { getByText } = renderWithTheme(<OperatorOnboardingForm />);

    expect(getByText('First name is required')).toBeInTheDocument();
    expect(getByText('Last name is required')).toBeInTheDocument();
    expect(getByText('Website is required')).toBeInTheDocument();
  });
});
