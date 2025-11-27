'use client';

import { type FC, useId } from 'react';

import { Box, Button, TextField } from '@mui/material';

import { FORM_SUBMIT_BUTTON } from '@/shared/constants';
import { FieldWithAsideHint, SubmitButton } from '@/shared/ui';

import { useOperatorUpdateProfile } from '../../model/useOperatorProfile';
import { ImagesInput } from '../ImagesInput/ImagesInput';
import { OperatorProfileHeader } from '../OperatorProfileHeader/OperatorProfileHeader';
import { OperatorTitle } from '../OperatorTitle/OperatorTitle';
import { HINT_TEXT_DESCRIPTION, HINT_TEXT_PHILOSOPHY } from './constants';

interface OperatorProfileEditProps {
  onCancel: () => void;
}

export const OperatorProfileEdit: FC<OperatorProfileEditProps> = ({
  onCancel,
}) => {
  const { form, onSubmit, operator, isPending, isSuccess } =
    useOperatorUpdateProfile({
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
  const isFormLocked = isPending || isSuccess;

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
        <SubmitButton
          textIdle={FORM_SUBMIT_BUTTON.textIdle}
          textLoading={FORM_SUBMIT_BUTTON.textLoading}
          textSuccess={FORM_SUBMIT_BUTTON.textSuccess}
          isLoading={isPending}
          isSuccess={isSuccess}
          disabled={isFormLocked}
        />
        <Button
          type="button"
          variant="outlined"
          size="large"
          fullWidth
          disabled={isFormLocked}
          onClick={onCancel}
        >
          Скасувати
        </Button>
      </Box>
    </Box>
  );
};
