'use client';

import React, { useEffect, useState } from 'react';

import { Box, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

import { FieldProps } from '@/features/create-edit-tour/model/types';

import { CurrencyField } from './CurrencyField';
import { TooltipForField } from './TooltipForField';

type PriceFieldProps = FieldProps & {
  price: number;
};

export const PriceField = ({ control, errors, price }: PriceFieldProps) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(price.toString());
  }, [price]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ціна"
              type="text"
              placeholder="0.00"
              autoComplete="off"
              value={inputValue}
              error={!!errors?.price}
              helperText={errors?.price?.message}
              fullWidth
              slotProps={{
                htmlInput: {
                  inputMode: 'decimal',
                  pattern: '[0-9]*[.,]?[0-9]*',
                },
              }}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9.,]/g, '');
                setInputValue(val);
              }}
              onBlur={() => {
                let val = inputValue.trim();
                if (val === '' || val === ',' || val === '.') val = '0';
                const numeric = parseFloat(val.replace(',', '.'));
                const finalValue = !isNaN(numeric) ? numeric : 0;
                field.onChange(finalValue);
                setInputValue(finalValue.toFixed(2));
              }}
            />
          )}
        />

        <CurrencyField control={control} />
      </Box>

      <TooltipForField text="Тільки цифри. Використовуйте кому або точку для десяткових." />
    </Box>
  );
};
