import React from 'react';

import {
  Autocomplete,
  Box,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';

import { FieldProps } from '@/features/create-edit-tour/model/types';

import { Country } from '@/entities/country/model/types';

import { CountryFlag } from './CountryFlag';

type CountryFieldProps = FieldProps & {
  countries: Country[];
  isLoading: boolean;
};

export const CountryField = ({
  countries,
  isLoading,
  control,
  errors,
  disabled,
}: CountryFieldProps) => {
  return (
    <Box sx={{ width: 'calc(100% - 210px)' }}>
      <Controller
        name="countryISO2Code"
        control={control}
        render={({ field }) => {
          const selectedCountry =
            countries.find((country) => country.iso2 === field.value) || null;

          const options = isLoading
            ? [{ id: 0, name: '', iso2: '' }]
            : countries;

          return (
            <Autocomplete
              options={options}
              getOptionLabel={(option) => option.name || ''}
              value={selectedCountry}
              onChange={(_, value) =>
                field.onChange(value && value.iso2 !== '' ? value.iso2 : '')
              }
              isOptionEqualToValue={(option, value) =>
                option.iso2 === value?.iso2
              }
              slotProps={{
                listbox: {
                  sx: { maxHeight: 200, overflowY: 'auto' },
                },
                popper: {
                  modifiers: [
                    { name: 'flip', enabled: false },
                    { name: 'preventOverflow', options: { altAxis: true } },
                  ],
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Країна"
                  error={!!errors?.countryISO2Code}
                  disabled={disabled}
                  // NOTE: Using InputProps is deprecated, but required for Autocomplete
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: selectedCountry ? (
                      <CountryFlag countryCode={selectedCountry.iso2} />
                    ) : null,
                  }}
                />
              )}
              renderOption={(props, option) => {
                const { key, ...rest } = props;
                return (
                  <li
                    key={key}
                    {...rest}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    {isLoading && option.id === 0 ? (
                      <CircularProgress size={20} style={{ marginRight: 8 }} />
                    ) : (
                      <>
                        <CountryFlag countryCode={option.iso2} />
                        {option.name}
                      </>
                    )}
                  </li>
                );
              }}
            />
          );
        }}
      />

      {errors?.countryISO2Code && (
        <Box sx={{ ml: 2 }}>
          <Typography variant="caption" color="error">
            {`Поле обов'язкове. Будь ласка, виберіть країну.`}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
