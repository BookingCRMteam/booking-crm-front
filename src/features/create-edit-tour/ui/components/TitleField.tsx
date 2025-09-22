import React from 'react';

import { Box, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

import { FieldProps } from '@/features/create-edit-tour/model/types';

import { TooltipForField } from './TooltipForField';

export const TitleField = ({ control, errors, disabled }: FieldProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="text"
            label="Назва туру"
            error={!!errors?.title}
            helperText={errors?.title?.message}
            fullWidth
            multiline
            minRows={1}
            maxRows={3}
            disabled={disabled}
          />
        )}
      />

      <TooltipForField text={`Коротка назва туру.\nМаксимум 150 символів.`} />
    </Box>
  );
};
