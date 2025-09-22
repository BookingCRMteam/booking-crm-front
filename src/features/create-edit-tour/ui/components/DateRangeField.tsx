import React from 'react';

import { Box, FormLabel } from '@mui/material';
import dayjs from 'dayjs';

import { FieldProps } from '@/features/create-edit-tour/model/types';

import { TourFormValues } from '../../model/schema';
import { CustomDatePicker } from './DatePicker';

type DateRangeFieldProps = FieldProps & {
  start: string;
  end: string;
};

export const DateRangeField = ({
  control,
  errors,
  start,
  end,
  disabled,
}: DateRangeFieldProps) => {
  return (
    <Box>
      <FormLabel component="legend" sx={{ ml: 1, mb: 1 }}>
        Дата
      </FormLabel>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
        }}
      >
        <CustomDatePicker<TourFormValues>
          name="startDate"
          control={control}
          error={!!errors?.startDate}
          helperText={errors?.startDate?.message}
          disablePast
          placeholder="ДД-ММ-РРРР"
          maxDate={end ? dayjs(end, 'YYYY-MM-DD') : undefined}
          disabled={disabled}
        />

        <CustomDatePicker<TourFormValues>
          name="endDate"
          control={control}
          error={!!errors?.endDate}
          helperText={errors?.endDate?.message}
          disablePast
          placeholder="ДД-ММ-РРРР"
          minDate={start ? dayjs(start, 'YYYY-MM-DD') : undefined}
          disabled={disabled}
        />
      </Box>
    </Box>
  );
};
