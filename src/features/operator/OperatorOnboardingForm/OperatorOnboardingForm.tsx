'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useRouter } from 'next/navigation';

import { MuiTelInput } from 'mui-tel-input';
import { Controller, useForm } from 'react-hook-form';

import { useUserStore } from '@/shared/providers/UserStoreProvider';

import {
  OperatorOnboardingSchemaValues,
  operatorOnboardingSchema,
} from './schema';
import { useOperatorOnboarding } from './useOperatorOnboarding';

//TODO: Оновити інпути після вточнення

const OperatorOnboardingForm = () => {
  const router = useRouter();
  const user = useUserStore((store) => store.user);
  const {
    control,
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<OperatorOnboardingSchemaValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: user?.email || 'example@gmail.com',
      phone: '',
      website: '',
    },
    resolver: zodResolver(operatorOnboardingSchema),
    mode: 'onTouched',
  });

  const { mutateAsync, isPending, isSuccess, error, isError } =
    useOperatorOnboarding();

  const onSubmit = async (data: OperatorOnboardingSchemaValues) => {
    try {
      await mutateAsync(data);
      router.push('/profile');
    } catch (e) {
      console.error('Mutation failed:', e);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 500,
        width: '100%',
        margin: '0 auto',
        p: 3,
        border: '1px solid #ccc',
        borderRadius: 2,
      }}
    >
      {/* <TextField
        label="Назва компанії"
        {...register('companyName')}
        error={!!errors.companyName}
        helperText={errors.companyName?.message}
        fullWidth
        required
        variant="outlined"
      />

      <TextField
        label="Опис"
        {...register('description')}
        error={!!errors.description}
        helperText={errors.description?.message}
        fullWidth
        required
        variant="outlined"
      /> */}
      <TextField
        label="Ім'я"
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

      <TextField
        label="Email"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        required
        variant="outlined"
        disabled
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
            //TODO: додати потрібні країни, також додати їх у schema
            onlyCountries={['UA', 'PL']}
            forceCallingCode
            disableFormatting
            focusOnSelectCountry
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            fullWidth
            variant="outlined"
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

      <Button
        type="submit"
        variant="contained"
        disabled={!isValid || isPending}
        loading={isPending}
      >
        Надіслати на верифікацію
      </Button>
      {isError ? (
        <Typography variant="h5" component="p">
          Сталась помилка: {error.message}
        </Typography>
      ) : null}

      {isSuccess ? (
        <Typography variant="h5" component="p">
          Успішно надіслано на верифікацію
        </Typography>
      ) : null}
    </Box>
  );
};

export default OperatorOnboardingForm;
