'use client';

import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { MuiTelInput } from 'mui-tel-input';
import { Controller } from 'react-hook-form';

import { useOperatorOnboarding } from '../model/useOperatorOnboarding';

export const OperatorOnboardingForm = () => {
  const { form, onSubmit, isPending } = useOperatorOnboarding();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid },
  } = form;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        maxWidth: 622,
        width: '100%',
        margin: '0 auto',
        padding: 8,
        border: '1px solid #ccc',
        borderRadius: 2,
      }}
    >
      <Typography component="h1" variant="h3" sx={{ fontSize: '32px' }}>
        Вітаємо зі створенням акаунту!
      </Typography>
      <Typography
        component="p"
        variant="bodyLarge"
        sx={{ textAlign: 'center' }}
      >
        Для верифікації вашого статусу “Туроператор”, будь ласка внесіть
        наступні дані:
      </Typography>
      <TextField
        label="Ім'я"
        placeholder="Ім'я"
        {...register('firstName')}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
        fullWidth
        required
        variant="outlined"
      />

      <TextField
        label="Прізвище"
        required
        {...register('lastName')}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
        fullWidth
        variant="outlined"
      />

      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <MuiTelInput
            label="Телефон"
            required
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
        label="Посилання на ваш Instagram"
        {...register('website')}
        error={!!errors.website}
        helperText={errors.website?.message}
        fullWidth
        required
        variant="outlined"
      />
      <FormControlLabel
        control={<Checkbox {...register('accept')} defaultChecked />}
        label="Я погоджуюсь на обробку персональних даних"
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={!isValid || isPending}
        loading={isPending}
      >
        Надіслати на верифікацію
      </Button>
    </Box>
  );
};
