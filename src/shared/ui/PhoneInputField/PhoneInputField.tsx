'use client';

import { MuiTelInput, type MuiTelInputProps } from 'mui-tel-input';
import { Control, Controller, type FieldValues, Path } from 'react-hook-form';

type PhoneInputFieldProps<TFormValues extends FieldValues> =
  MuiTelInputProps & {
    name: Path<TFormValues>;
    control: Control<TFormValues>;
  };

export const PhoneInputField = <TFormValues extends FieldValues>({
  name,
  control,
  label = 'Номер телефону',
  placeholder,
}: PhoneInputFieldProps<TFormValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, ref, name },
        fieldState,
      }) => (
        <MuiTelInput
          label={label}
          placeholder={placeholder}
          inputRef={ref}
          value={value ?? ''}
          onChange={(val) => onChange(val)}
          onBlur={onBlur}
          name={name}
          defaultCountry="UA"
          forceCallingCode
          preferredCountries={['UA', 'US']}
          excludedCountries={['RU']}
          continents={['EU', 'NA']}
          langOfCountryName="UA"
          disableFormatting
          focusOnSelectCountry
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          variant="outlined"
          MenuProps={{
            disableScrollLock: true,
            PaperProps: {
              style: { maxHeight: 250, width: '100%', maxWidth: 493 },
            },
            disablePortal: true,
            anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
          }}
        />
      )}
    />
  );
};
