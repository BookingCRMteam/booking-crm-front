import { useId } from 'react';

import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

import { FieldProps } from '@/features/create-edit-tour/model/types';

import { FieldWithAsideHint } from '@/shared/ui';

const HINT_TEXT_TITLE = 'Максимум 150 символів';

export const TitleField = ({ control, errors, disabled }: FieldProps) => {
  const titleHintId = useId();

  return (
    <Controller
      name="title"
      control={control}
      render={({ field }) => (
        <FieldWithAsideHint
          describedById={titleHintId}
          hintText={disabled ? undefined : HINT_TEXT_TITLE}
        >
          <TextField
            {...field}
            label="Назва"
            placeholder="Введіть назву туру"
            error={!!errors?.title}
            helperText={errors?.title?.message as string}
            fullWidth
            multiline
            minRows={1}
            maxRows={3}
            disabled={disabled}
          />
        </FieldWithAsideHint>
      )}
    />
  );
};
