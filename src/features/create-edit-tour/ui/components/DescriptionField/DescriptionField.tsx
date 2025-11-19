import { useId } from 'react';

import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

import { FieldProps } from '@/features/create-edit-tour/model/types';

import { FieldWithAsideHint } from '@/shared/ui';

export const DescriptionField = ({ control, errors }: FieldProps) => {
  const HINT_TEXT_DESCRIPTION =
    'Коротко опишіть тур: основні локації, формат подорожі, для кого підходить. Максимум 5000 символів';
  const descriptionHintId = useId();

  return (
    <Controller
      name="description"
      control={control}
      render={({ field }) => (
        <FieldWithAsideHint
          describedById={descriptionHintId}
          hintText={HINT_TEXT_DESCRIPTION}
        >
          <TextField
            {...field}
            label="Опис"
            placeholder="Додайте опис туру"
            error={!!errors?.description}
            helperText={errors?.description?.message as string}
            fullWidth
            multiline
            rows={7}
          />
        </FieldWithAsideHint>
      )}
    />
  );
};
