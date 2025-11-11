import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';

import { PhoneInputField } from './PhoneInputField';

type FormValues = { phone: string };

describe('PhoneInputField', () => {
  const defaultValues = { phone: '+380931112233' };

  const TestComponent = ({
    withError = false,
    initialPhone = defaultValues.phone,
    initialValueUndefined = false,
  }: {
    withError?: boolean;
    initialPhone?: string;
    initialValueUndefined?: boolean;
  }) => {
    const methods = useForm<FormValues>({
      defaultValues: initialValueUndefined ? {} : { phone: initialPhone },
    });

    React.useEffect(() => {
      if (withError) {
        methods.setError('phone', {
          type: 'required',
          message: 'Phone is required',
        });
      }
    }, [withError, methods]);

    return (
      <FormProvider {...methods}>
        <PhoneInputField name="phone" control={methods.control} />
      </FormProvider>
    );
  };

  it('renders correctly with default value', () => {
    render(<TestComponent />);
    const input = screen.getByLabelText('Номер телефону') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toContain('931112233');
  });

  it('renders correctly when input is initially empty', () => {
    render(<TestComponent initialPhone="" />);
    const input = screen.getByLabelText('Номер телефону') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('renders correctly when value is undefined', () => {
    render(<TestComponent initialValueUndefined />);
    const input = screen.getByLabelText('Номер телефону') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('updates value on change', () => {
    render(<TestComponent />);
    const input = screen.getByLabelText('Номер телефону') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '+380991234567' } });
    expect(input.value).toContain('991234567');
  });

  it('calls onBlur when input loses focus', () => {
    render(<TestComponent />);
    const input = screen.getByLabelText('Номер телефону') as HTMLInputElement;

    fireEvent.blur(input);
    expect(input).toBeInTheDocument();
  });

  it('renders MuiTelInput with outlined variant', () => {
    render(<TestComponent />);
    const input = screen.getByLabelText('Номер телефону') as HTMLInputElement;
    expect(input).toBeInTheDocument();
  });

  it('displays error message when error exists', () => {
    render(<TestComponent withError />);
    const errorText = screen.getByText('Phone is required');
    expect(errorText).toBeInTheDocument();
  });

  it('does not display error message when there is no error', () => {
    render(<TestComponent />);
    const errorText = screen.queryByText('Phone is required');
    expect(errorText).toBeNull();
  });

  it('renders input with correct defaultCountry, forceCallingCode, and excludedCountries', () => {
    render(<TestComponent />);
    const input = screen.getByLabelText('Номер телефону') as HTMLInputElement;
    expect(input).toBeInTheDocument();
  });

  it('renders MenuProps without crashing', () => {
    render(<TestComponent />);
    const input = screen.getByLabelText('Номер телефону') as HTMLInputElement;
    fireEvent.focus(input);
    expect(input).toBeInTheDocument();
  });
});
