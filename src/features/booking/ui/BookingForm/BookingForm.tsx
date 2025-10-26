import { Box, BoxProps, Button, TextField, styled } from '@mui/material';

import { PhoneInputField } from '@/shared/ui';

import { useBookingForm } from '../../lib/useBookingForm';

type BookingFormProps = {
  disableSubmit?: boolean;
};

const StyledContainer = styled(Box)<BoxProps>({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  width: '100%',
});

const NameWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '23px',
  width: '100%',
});

const buttonSx = {
  maxWidth: '268px',
  alignSelf: 'center',
};

export const BookingForm = ({ disableSubmit }: BookingFormProps) => {
  const { form, onSubmit } = useBookingForm();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const handleFormSubmit = disableSubmit
    ? (e: React.FormEvent) => e.preventDefault()
    : handleSubmit(onSubmit);

  return (
    <StyledContainer component="form" onSubmit={handleFormSubmit}>
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

      <PhoneInputField name="phone" control={control} />
      <Button
        variant="contained"
        type="submit"
        disabled={isSubmitting}
        sx={buttonSx}
      >
        ПЕРЕЙТИ ДО ОПЛАТИ
      </Button>
    </StyledContainer>
  );
};
