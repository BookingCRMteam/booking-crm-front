import { MuiTelInput } from 'mui-tel-input';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type PhoneInputFieldProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
};

export const PhoneInputField = <TFormValues extends FieldValues>({
  name,
  control,
}: PhoneInputFieldProps<TFormValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <MuiTelInput
          label="Номер телефону"
          {...field}
          value={field.value ?? ''}
          defaultCountry="UA"
          forceCallingCode
          preferredCountries={['UA', 'US']}
          excludedCountries={['RU']}
          continents={['EU']}
          disableFormatting
          focusOnSelectCountry
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          variant="outlined"
          MenuProps={{
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
