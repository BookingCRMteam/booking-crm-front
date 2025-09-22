import React from 'react';

import { Box, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

import { FieldProps } from '@/features/create-edit-tour/model/types';

import { TooltipForField } from './TooltipForField';

export const DescriptionField = ({ control, errors }: FieldProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="text"
            label="Опис та програма туру"
            error={!!errors?.description}
            helperText={errors?.description?.message}
            multiline
            minRows={3}
            maxRows={10}
            fullWidth
          />
        )}
      />

      <TooltipForField
        text={`Коротко опишіть тур: основні локації, формат подорожі, для кого підходить.\nМаксимум 5000 символів.`}
      />
    </Box>
  );
};
