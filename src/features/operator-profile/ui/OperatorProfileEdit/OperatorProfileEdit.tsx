'use client';

import { type FC, useId } from 'react';

import { Box, Button, TextField } from '@mui/material';

import { FieldWithAsideHint } from '@/shared/ui';

import { useOperatorUpdateProfile } from '../../model/useOperatorProfile';
import { ImagesInput } from '../ImagesInput/ImagesInput';
import { OperatorProfileHeader } from '../OperatorProfileHeader/OperatorProfileHeader';
import { OperatorTitle } from '../OperatorTitle/OperatorTitle';

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
          placeholder="Про себе"
          label="Про себе"
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message as string}
          fullWidth
          multiline
          rows={3.4}
          aria-describedby={descriptionHintId}
        />
      </FieldWithAsideHint>

      <FieldWithAsideHint
        describedById={philosophyHintId}
        hintText={HINT_TEXT_PHILOSOPHY}
      >
        <TextField
          placeholder="Моя філософія"
          label="Моя філософія"
          {...register('philosophy')}
          error={!!errors.philosophy}
          helperText={errors.philosophy?.message as string}
          fullWidth
          multiline
          rows={3.4}
          variant="outlined"
          aria-describedby={philosophyHintId}
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
