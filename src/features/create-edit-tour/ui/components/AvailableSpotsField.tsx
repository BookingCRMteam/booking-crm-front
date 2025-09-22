import React from 'react';

import { Box, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

import { FieldProps } from '@/features/create-edit-tour/model/types';

import { TooltipForField } from './TooltipForField';

export const AvailableSpotsField = ({ control, errors }: FieldProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
      <Controller
        name="availableSpots"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Кількість учасників"
            type="text"
            placeholder="2"
            autoComplete="off"
            error={!!errors?.availableSpots}
            helperText={errors?.availableSpots?.message}
            fullWidth
            slotProps={{
              htmlInput: {
                inputMode: 'numeric',
                min: 2,
                max: 100,
                step: 2,
              },
            }}
            value={field.value ?? ''}
            onChange={(e) => {
              const val = Number(e.target.value);

              if (!isNaN(val)) {
                field.onChange(val);
              }
            }}
          />
        )}
      />

      <TooltipForField
        text={`Вкажіть кількість учасників.\nДо 100 місць, парне число.`}
      />
    </Box>
  );
};
