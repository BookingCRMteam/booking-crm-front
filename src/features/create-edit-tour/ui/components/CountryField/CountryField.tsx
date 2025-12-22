import { Box } from '@mui/material';
import { Controller } from 'react-hook-form';

import { FieldProps } from '@/features/create-edit-tour/model/types';

import { Country } from '@/entities/country';

import { DropdownField } from '@/shared/ui';

import { CountryFlag } from './CountryFlag';

type CountryFieldProps = FieldProps & {
  countries: Country[];
  isLoading: boolean;
};

export const CountryField = ({
  control,
  errors,
  countries,
  isLoading,
  clearErrors,
  disabled,
}: CountryFieldProps) => {
  return (
    <Controller
      name="countryISO2Code"
      control={control}
      render={({ field }) => {
        const value = countries.find((c) => c.iso2 === field.value) || null;

        return (
          <DropdownField
            items={countries}
            value={value}
            onChange={(country) => field.onChange(country.iso2)}
            onBlur={field.onBlur}
            getItemLabel={(c) => c.name}
            getItemId={(c) => c.iso2}
            label="Країна"
            placeholder="Оберіть країну"
            isLoading={isLoading}
            disabled={disabled}
            inputAdornment={
              value ? <CountryFlag countryCode={value.iso2} /> : null
            }
            error={!!errors?.countryISO2Code}
            helperText={errors?.countryISO2Code?.message}
            fieldName="countryISO2Code"
            clearErrors={clearErrors}
            renderItem={(c) => (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CountryFlag countryCode={c.iso2} />
                {c.name}
              </Box>
            )}
          />
        );
      }}
    />
  );
};
