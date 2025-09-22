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

import { City } from '@/entities/city/model/types';

type CityFieldProps = FieldProps & {
  cities: City[];
  isLoading: boolean;
};

export const CityField = ({
  cities,
  isLoading,
  control,
  errors,
  disabled,
}: CityFieldProps) => {
  return (
    <Box sx={{ width: 'calc(100% - 210px)' }}>
      <Controller
        name="cityId"
        control={control}
        render={({ field }) => {
          const selectedCity =
            cities.find((city) => city.id === field.value) || null;

          const options = isLoading ? [{ id: 0, name: '' }] : cities;

          return (
            <Autocomplete
              disabled={cities.length === 0}
              options={options}
              getOptionLabel={(option) => option.name || ''}
              value={selectedCity}
              onChange={(_, value) =>
                field.onChange(value && value.id !== 0 ? value.id : 0)
              }
              isOptionEqualToValue={(option, value) => option.id === value?.id}
              slotProps={{
                listbox: { sx: { maxHeight: 200, overflowY: 'auto' } },
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
                  label="Місто"
                  error={!!errors?.cityId}
                  disabled={disabled}
                />
              )}
              renderOption={(props, option) => {
                return (
                  <li
                    {...props}
                    key={`${option.id}-${new Date()}`}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    {isLoading && option.id === 0 ? (
                      <CircularProgress size={20} style={{ marginRight: 8 }} />
                    ) : (
                      option.name
                    )}
                  </li>
                );
              }}
            />
          );
        }}
      />

      {errors?.cityId && (
        <Box sx={{ ml: 2 }}>
          <Typography variant="caption" color="error">
            {`Поле обов'язкове. Будь ласка, виберіть місто.`}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
