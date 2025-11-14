'use client';

import {
  Box,
  type BoxProps,
  Button,
  FormControlLabel,
  TextField,
  Typography,
  styled,
} from '@mui/material';

import { CheckboxSmall, PhoneInputField } from '@/shared/ui';

import { useOperatorOnboarding } from '../model/useOperatorOnboarding';
import {
  FORM_CHECKBOX_LABEL,
  FORM_DESCRIPTION,
  FORM_FIRST_NAME_LABEL,
  FORM_LAST_NAME_LABEL,
  FORM_PHONE_PLACEHOLDER,
  FORM_SUBMIT_BUTTON,
  FORM_TITLE,
  FORM_WEBSITE_LABEL,
} from './constants';

const Form = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  maxWidth: '814px',
  width: '100%',
  margin: '0 auto',
  padding: '63.2px 64px',
  border: `1px solid ${theme.palette.gray[500]}`,
  borderRadius: 2,
  '& > *': {
    width: '100%',
  },
}));

const SubmitButton = styled(Button)({
  maxWidth: '331px',
  '&:disabled': {
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    color: 'rgba(0, 0, 0, 0.38)',
  },
});

const CheckboxLabel = styled(FormControlLabel)(({ theme }) => ({
  alignSelf: 'flex-start',
  margin: 0,
  gap: '4px',
  color: theme.palette.gray[900],
  letterSpacing: '-0.01em',
}));

export const OperatorOnboardingForm = () => {
  const { form, onSubmit, isPending } = useOperatorOnboarding();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid },
  } = form;

  return (
    <Form component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography component="h1" variant="h2" align="center">
        {FORM_TITLE}
      </Typography>
      <Typography
        component="p"
        align="center"
        variant="bodyLarge"
        maxWidth={440}
      >
        {FORM_DESCRIPTION}
      </Typography>
      <TextField
        label={FORM_FIRST_NAME_LABEL}
        placeholder={FORM_FIRST_NAME_LABEL}
        {...register('firstName')}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
        fullWidth
        variant="outlined"
      />

      <TextField
        label={FORM_LAST_NAME_LABEL}
        placeholder={FORM_LAST_NAME_LABEL}
        {...register('lastName')}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
        fullWidth
        variant="outlined"
      />

      <PhoneInputField
        control={control}
        name="phone"
        placeholder={FORM_PHONE_PLACEHOLDER}
        label={null}
      />
      <TextField
        label={FORM_WEBSITE_LABEL}
        placeholder={FORM_WEBSITE_LABEL}
        {...register('website')}
        error={!!errors.website}
        helperText={errors.website?.message}
        fullWidth
        variant="outlined"
      />
      <CheckboxLabel
        control={<CheckboxSmall {...register('accept')} defaultChecked />}
        label={
          <Typography variant="tagBadge">{FORM_CHECKBOX_LABEL}</Typography>
        }
      />
      <SubmitButton
        type="submit"
        variant="contained"
        size="large"
        disabled={!isValid || isPending}
        loading={isPending}
      >
        {FORM_SUBMIT_BUTTON}
      </SubmitButton>
    </Form>
  );
};
