import type { FC } from 'react';

import { Box, Button, TextField } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import { Controller } from 'react-hook-form';

import { useCoupleProfileForm } from '../model/useCoupleProfileForm';

interface CoupleProfileForm {
  onCancel: () => void;
}

export const CoupleProfileForm: FC<CoupleProfileForm> = ({ onCancel }) => {
  const { form, onSubmit, isChanged, isPending } = useCoupleProfileForm({
    onCancel,
  });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = form;
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
        margin: '0 auto',
      }}
    >
      <TextField
        label="Ім’я партнера 1"
        placeholder="Ім’я партнера 1"
        {...register('firstPersonName')}
        error={!!errors.firstPersonName}
        helperText={errors.firstPersonName?.message}
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Прізвище партнера 1"
        placeholder="Прізвище партнера 1"
        {...register('firstPersonSurname')}
        error={!!errors.firstPersonSurname}
        helperText={errors.firstPersonSurname?.message}
        fullWidth
        variant="outlined"
      />
      <TextField
        label="Ім’я партнера 2"
        placeholder="Ім’я партнера 2"
        {...register('secondPersonName')}
        error={!!errors.secondPersonName}
        helperText={errors.secondPersonName?.message}
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Прізвище партнера 2"
        placeholder="Прізвище партнера 2"
        {...register('secondPersonSurname')}
        error={!!errors.secondPersonSurname}
        helperText={errors.secondPersonSurname?.message}
        fullWidth
        variant="outlined"
      />

      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <MuiTelInput
            label="Номер телефону"
            {...field}
            value={field.value ?? ''}
            defaultCountry="UA"
            forceCallingCode
            preferredCountries={['UA', 'US']}
            continents={['EU', 'NA']}
            disableFormatting
            focusOnSelectCountry
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            variant="outlined"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 250,
                  width: 493,
                },
              },
              disablePortal: true,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
            }}
          />
        )}
      />

      <TextField
        label="Електронна пошта"
        placeholder="Електронна пошта"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        disabled
        variant="outlined"
      />

      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          alignSelf: 'center',
        }}
      >
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!isChanged || isPending}
          loading={isPending}
        >
          Зберегти
        </Button>
        <Button
          type="button"
          variant="contained"
          size="large"
          onClick={onCancel}
          disabled={isPending}
        >
          Скасувати
        </Button>
      </Box>
    </Box>
  );
};
