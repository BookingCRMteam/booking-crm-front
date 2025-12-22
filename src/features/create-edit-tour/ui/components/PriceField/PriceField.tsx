import { useId } from 'react';

import { Box, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

import { FieldProps } from '@/features/create-edit-tour/model/types';

import { FieldWithAsideHint } from '@/shared/ui';

import { CurrencyField } from './CurrencyField';

// TODO: update hint dynamically if other currencies are added (USD, EUR)
const HINT_TEXT_PRICE =
  'Число від 100 до 100 000, без символів, допускається крапка';

export const PriceField = ({
  control,
  errors,
  clearErrors,
  trigger,
}: FieldProps) => {
  const priceHintId = useId();

  const sanitize = (value: string) => {
    let cleaned = value.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');

    if (parts.length > 2) cleaned = parts[0] + '.' + parts[1];
    if (parts[1]?.length > 2) cleaned = parts[0] + '.' + parts[1].slice(0, 2);

    return cleaned;
  };

  return (
    <FieldWithAsideHint describedById={priceHintId} hintText={HINT_TEXT_PRICE}>
      <Box sx={{ display: 'flex', gap: 3, width: '100%' }}>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ціна"
              placeholder="Введіть вартість"
              fullWidth
              error={!!errors?.price}
              onFocus={() => clearErrors?.('price')}
              helperText={errors?.price?.message as string}
              autoComplete="off"
              inputMode="decimal"
              value={field.value ?? ''}
              onChange={(e) => {
                const cleaned = sanitize(e.target.value);
                field.onChange(cleaned);
              }}
              onBlur={(e) => {
                const cleaned = sanitize(e.target.value);

                const valueToSet = cleaned ? String(Number(cleaned)) : '';
                field.onChange(valueToSet);

                setTimeout(() => {
                  trigger?.('price');
                });
              }}
            />
          )}
        />

        <CurrencyField control={control} />
      </Box>
    </FieldWithAsideHint>
  );
};
