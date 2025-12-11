import type { FC } from 'react';

import {
  Box,
  BoxProps,
  Button,
  TextField,
  Typography,
  styled,
} from '@mui/material';

import { FORM_SUBMIT_BUTTON } from '@/shared/constants';
import { PhoneInputField, SubmitButton } from '@/shared/ui';

import { useCoupleProfileForm } from '../../model/useCoupleProfileForm';

type CoupleProfileFormProps = {
  onCancel: () => void;
};

const NameWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '23px',
  width: '100%',
});

const InputWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
});

const HintWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '24px',
  '& > *:last-child': {
    width: '100%',
    maxWidth: '686px',
  },
});

const ButtonWrapper = styled(Box)({
  display: 'flex',
  gap: '20px',
  alignSelf: 'center',
  width: '100%',
  maxWidth: '420px',
});

const FormWrapper = styled(Box)<BoxProps>({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '20px',
  gap: '20px',
  maxWidth: '863px',
  width: '100%',
  margin: '0 auto',
});

export const CoupleProfileForm: FC<CoupleProfileFormProps> = ({ onCancel }) => {
  const { form, onSubmit, isPending, isSuccess, email } = useCoupleProfileForm({
    onCancel,
  });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = form;
  const isFormLocked = isPending || isSuccess;
  return (
    <FormWrapper component="form" onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <HintWrapper>
          <Typography
            variant="bodyDefault"
            sx={{ padding: '17.5px 0', width: '153px' }}
          >
            Ім&apos;я та прізвища:
          </Typography>
          <Box sx={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
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
          </Box>
        </HintWrapper>

        <HintWrapper>
          <Typography
            variant="bodyDefault"
            sx={{ padding: '17.5px 0', width: '153px' }}
          >
            Телефон:
          </Typography>
          <PhoneInputField control={control} name="phone" />
        </HintWrapper>
        <HintWrapper>
          <Typography
            variant="bodyDefault"
            sx={{ padding: '17.5px 0', width: '153px' }}
          >
            Електронна пошта:
          </Typography>
          <Typography variant="bodyLarge" sx={{ padding: '16.5px 0' }}>
            {email ?? '—'}
          </Typography>
        </HintWrapper>
      </InputWrapper>
      <ButtonWrapper>
        <SubmitButton
          sx={{ width: '200px' }}
          textIdle={FORM_SUBMIT_BUTTON.textIdle}
          textLoading={FORM_SUBMIT_BUTTON.textLoading}
          textSuccess={FORM_SUBMIT_BUTTON.textSuccess}
          isLoading={isPending}
          isSuccess={isSuccess}
          disabled={isFormLocked}
        />
        <Button
          sx={{ width: '200px', height: '37px' }}
          type="button"
          variant="outlined"
          size="large"
          fullWidth
          onClick={onCancel}
          disabled={isFormLocked}
        >
          Скасувати
        </Button>
      </ButtonWrapper>
    </FormWrapper>
  );
};
