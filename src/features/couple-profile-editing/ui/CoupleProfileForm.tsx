import type { FC } from 'react';

import { Box, Button, TextField, styled } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import { Controller } from 'react-hook-form';

import { useCoupleProfileForm } from '../model/useCoupleProfileForm';

interface CoupleProfileForm {
  onCancel: () => void;
}

const NameWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '23px',
  width: '100%',
});

const ButtonWrapper = styled(Box)({
  display: 'flex',
  gap: '20px',
  alignSelf: 'center',
  width: '100%',
  maxWidth: '420px',
});

export const CoupleProfileForm: FC<CoupleProfileForm> = ({ onCancel }) => {
  const { form, onSubmit, isPending } = useCoupleProfileForm({
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
        pt: 4,
        gap: 4,
        maxWidth: 686,
        width: '100%',
        margin: '0 auto',
      }}
    >
      <NameWrapper>
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
      </NameWrapper>

      <NameWrapper>
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
      </NameWrapper>
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
            excludedCountries={['RU']}
            continents={['EU']}
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

      <ButtonWrapper>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={isPending}
          loading={isPending}
        >
          Зберегти
        </Button>
        <Button
          type="button"
          variant="outlined"
          size="large"
          fullWidth
          color="secondary"
          onClick={onCancel}
          disabled={isPending}
        >
          Скасувати
        </Button>
      </ButtonWrapper>
    </Box>
  );
};
