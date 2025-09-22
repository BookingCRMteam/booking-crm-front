import React from 'react';

import { TextFieldProps } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type CustomDatePickerProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  error?: boolean;
  helperText?: string;
  disablePast?: boolean;
  placeholder?: string;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  disabled?: boolean;
};

export const CustomDatePicker = <T extends FieldValues>({
  name,
  control,
  error,
  helperText,
  disablePast = true,
  placeholder = 'ДД-ММ-РРРР',
  minDate,
  maxDate,
  disabled,
}: CustomDatePickerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const value = field.value ? dayjs(field.value, 'YYYY-MM-DD') : null;

        return (
          <DatePicker
            value={value}
            onChange={(date: Dayjs | null) =>
              field.onChange(date ? date.format('YYYY-MM-DD') : '')
            }
            disablePast={disablePast}
            minDate={minDate}
            maxDate={maxDate}
            slotProps={{
              textField: {
                error,
                helperText,
                inputProps: { placeholder },
              } as TextFieldProps,
            }}
            format="DD-MM-YYYY"
            disabled={disabled}
          />
        );
      }}
    />
  );
};
