'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography } from '@mui/material';

import React from 'react';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';

import { APP_ROUTE } from '@/shared/constants/routes';

import { useStore } from '@/store';

import {
  OperatorRegistrationSchema,
  operatorRegistrationSchema,
} from './schema/operatorRegistrationSchema';

const OperatorRegistrationForm = () => {
  const { showNotification } = useStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OperatorRegistrationSchema>({
    resolver: zodResolver(operatorRegistrationSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = async (data: OperatorRegistrationSchema) => {
    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => resolve(data), 3000);
      });
      console.log('response', response);
      showNotification('Operator registered successfully', 'success');
      router.push(APP_ROUTE.HOME);
    } catch (error) {
      console.error(error);
      showNotification('Operator registration failed', 'error');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '40%' }}
    >
      <Typography variant="body1">
        Заповніть всі поля для завершення реєстрації.
      </Typography>
      <Typography variant="body1">
        Ваші дані будуть передані на розгляд адміністрації.
      </Typography>
      <Typography variant="body1">
        Після підтвердження вашої заявки, ви отримаєте доступ до системи для
        керування замовленнями.
      </Typography>

      <TextField
        label="Name"
        variant="outlined"
        autoComplete="name"
        error={!!errors.name}
        helperText={errors.name?.message}
        {...register('name')}
      />

      <TextField
        label="Email"
        variant="outlined"
        autoComplete="email"
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email')}
      />

      <TextField
        label="Phone"
        variant="outlined"
        autoComplete="tel"
        error={!!errors.phone}
        helperText={errors.phone?.message}
        {...register('phone')}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        loading={isSubmitting}
        sx={{ width: '100%' }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default OperatorRegistrationForm;
