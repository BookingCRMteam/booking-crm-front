'use client';

import { type FC, useId } from 'react';

import { Box, Button, TextField } from '@mui/material';

import { useOperatorUpdateProfile } from '../model/useOperatorProfile';
import { FieldWithAsideHint } from './FielWithAsideHint';
import { ImagesInput } from './ImagesInput';
import { OperatorProfileHeader } from './OperatorProfileHeader';
import { OperatorTitle } from './OperatorTitle';

interface OperatorProfileEditProps {
  onCancel: () => void;
}

const HINT_TEXT_PHILOSOPHY =
  'Ваші головні цінності при створенні авторських турів\nМаксимум 1000 символів';
const HINT_TEXT_DESCRIPTION =
  'Коротко опишіть себе чи свою діяльність. Підкресліть свою “родзинку”\nМаксимум 500 символів';

export const OperatorProfileEdit: FC<OperatorProfileEditProps> = ({
  onCancel,
}) => {
  const { form, onSubmit, operator, isPending } = useOperatorUpdateProfile({
    onCancel,
  });
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  const philosophyHintId = useId();
  const descriptionHintId = useId();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        maxWidth: 778,
        width: '100%',
        mx: 'auto',
      }}
    >
      {operator && (
        <OperatorProfileHeader>
          <ImagesInput
            control={control}
            initialPreviewUrl={operator?.photo}
            onDeleteFlagChange={(value) =>
              setValue('removePhoto', value, { shouldDirty: true })
            }
          />
          <OperatorTitle isEdit {...operator} />
        </OperatorProfileHeader>
      )}
      <FieldWithAsideHint
        describedById={descriptionHintId}
        hintText={HINT_TEXT_DESCRIPTION}
      >
        <TextField
          placeholder="Опис"
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message as string}
          fullWidth
          multiline
          rows={3.4}
          variant="outlined"
          aria-describedby={descriptionHintId}
          slotProps={{
            input: {
              sx: {
                padding: '18px 14px',
              },
            },
          }}
        />
      </FieldWithAsideHint>

      <FieldWithAsideHint
        describedById={philosophyHintId}
        hintText={HINT_TEXT_PHILOSOPHY}
      >
        <TextField
          placeholder="Філософія"
          {...register('philosophy')}
          error={!!errors.philosophy}
          helperText={errors.philosophy?.message as string}
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          aria-describedby={philosophyHintId}
          slotProps={{
            input: {
              sx: {
                padding: '18px 14px',
              },
            },
          }}
        />
      </FieldWithAsideHint>
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          mx: 'auto',
          maxWidth: 420,
          width: '100%',
        }}
      >
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          loading={isPending}
          disabled={isPending}
        >
          Зберегти
        </Button>
        <Button
          type="button"
          variant="outlined"
          size="large"
          fullWidth
          disabled={isPending}
          onClick={onCancel}
        >
          Скасувати
        </Button>
      </Box>
    </Box>
  );
};
