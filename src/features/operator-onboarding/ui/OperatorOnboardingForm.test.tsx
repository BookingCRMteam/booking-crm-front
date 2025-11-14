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
  FORM_SUBMIT_BUTTON,
  FORM_TITLE,
  FORM_WEBSITE_LABEL,
} from './constants';

jest.mock('../model/useOperatorOnboarding');
jest.mock('@/entities/user', () => ({
  useUserQuery: jest.fn(),
}));

jest.mock('@/shared/ui', () => ({
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
    const { getByText, getByLabelText, getByPlaceholderText, getByRole } =
      renderWithTheme(<OperatorOnboardingForm />);

    expect(getByText(FORM_TITLE)).toBeInTheDocument();
    expect(getByText(FORM_DESCRIPTION)).toBeInTheDocument();
    expect(getByLabelText(FORM_FIRST_NAME_LABEL)).toBeInTheDocument();
    expect(getByLabelText(FORM_LAST_NAME_LABEL)).toBeInTheDocument();
    expect(getByPlaceholderText(FORM_PHONE_PLACEHOLDER)).toBeInTheDocument();
    expect(getByLabelText(FORM_WEBSITE_LABEL)).toBeInTheDocument();
    expect(getByText(FORM_CHECKBOX_LABEL)).toBeInTheDocument();
    expect(
      getByRole('button', { name: FORM_SUBMIT_BUTTON }),
    ).toBeInTheDocument();
  });

  it('calls handleSubmit and onSubmit when form is submitted', async () => {
    const { user, getByRole } = renderWithTheme(<OperatorOnboardingForm />);

    const submitButton = getByRole('button', { name: FORM_SUBMIT_BUTTON });
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

    const { getByRole } = renderWithTheme(<OperatorOnboardingForm />);
    const button = getByRole('button', { name: FORM_SUBMIT_BUTTON });
    expect(button).toBeDisabled();
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

    const { getByRole } = renderWithTheme(<OperatorOnboardingForm />);
    const button = getByRole('button', { name: FORM_SUBMIT_BUTTON });
    expect(button).toBeDisabled();
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
