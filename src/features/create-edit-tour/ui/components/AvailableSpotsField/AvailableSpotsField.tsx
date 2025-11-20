import { useId, useRef } from 'react';

import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

import { FieldProps } from '@/features/create-edit-tour/model/types';

import { FieldWithAsideHint } from '@/shared/ui';

type AvailableSpotsFieldProps = FieldProps & {
  mode?: 'create' | 'edit';
};

const HINT_TEXT_SPOTS = 'Введіть кількість учасників (парне число)';
const HINT_TEXT_EDIT =
  'В режимі редагування кількість місць можна лише збільшити (парне число)';

export const AvailableSpotsField = ({
  control,
  errors,
  mode = 'create',
}: AvailableSpotsFieldProps) => {
  const spotsHintId = useId();

  const initialSpotsRef = useRef(0);

  return (
    <Controller
      name="availableSpots"
      control={control}
      render={({ field }) => {
        if (initialSpotsRef.current === 0) {
          initialSpotsRef.current = field.value ? Number(field.value) : 0;
        }

        return (
          <FieldWithAsideHint
            describedById={spotsHintId}
            hintText={mode === 'edit' ? HINT_TEXT_EDIT : HINT_TEXT_SPOTS}
          >
            <TextField
              {...field}
              label="Кількість учасників"
              placeholder="Введіть кількість учасників"
              error={!!errors?.availableSpots}
              helperText={errors?.availableSpots?.message}
              fullWidth
              autoComplete="off"
              slotProps={{
                htmlInput: {
                  inputMode: 'numeric',
                  min: 2,
                  max: 100,
                  step: 2,
                },
              }}
              value={
                field.value === 0 || field.value === undefined
                  ? ''
                  : field.value
              }
              onChange={(e) => {
                const raw = e.target.value;

                if (raw === '') {
                  field.onChange(undefined);
                  return;
                }

                const val = Number(raw);

                if (isNaN(val)) return;

                field.onChange(val);
              }}
              onBlur={() => {
                if (mode === 'edit' && field.value < initialSpotsRef.current) {
                  field.onChange(initialSpotsRef.current);
                }
              }}
            />
          </FieldWithAsideHint>
        );
      }}
    />
  );
};
