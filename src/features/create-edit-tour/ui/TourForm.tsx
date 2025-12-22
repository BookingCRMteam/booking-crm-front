'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import { useCities } from '@/entities/city';
import { useCountries } from '@/entities/country';
import { TourPhotoForm, useFetchTour } from '@/entities/tour';

import { APP_ROUTE, FORM_SUBMIT_BUTTON } from '@/shared/constants';
import { SubmitButton } from '@/shared/ui';

import { useTourFormSubmit } from '../lib/useTourFormSubmit';
import { TourFormSchema, TourFormValues } from '../model/schema';
import {
  AvailableSpotsField,
  CityField,
  CountryField,
  DateRangeField,
  DescriptionField,
  Photos,
  PriceField,
  TitleField,
} from './components';

type TourFormProps = {
  operatorId?: number;
  tourId?: number;
};

export const TourForm = ({ operatorId, tourId }: TourFormProps) => {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm<TourFormValues>({
    resolver: zodResolver(TourFormSchema),
    defaultValues: {
      title: '',
      description: '',
      countryISO2Code: '',
      cityId: 0,
      availableSpots: 0,
      price: '',
      currency: 'UAH',
      startDate: '',
      endDate: '',
      photos: [],
    },
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });

  const isEditMode = Boolean(tourId);

  const router = useRouter();

  const ISO2Code = watch('countryISO2Code');
  const start = watch('startDate');
  const end = watch('endDate');

  const [initialValues, setInitialValues] = useState<
    TourFormValues | undefined
  >(undefined);
  const [prevISO2Code, setPrevISO2Code] = useState('');

  const { data: countries = [], isLoading: countryLoading } =
    useCountries('uk');

  const { data: cities = [], isLoading: citiesLoading } = useCities(
    ISO2Code,
    'uk',
  );

  const { data: tourData, isLoading: tourDataLoading } = useFetchTour(
    tourId ?? undefined,
  );

  const isBooked = Boolean(tourData?.bookedSpots);

  const { handleSubmitForm, isSubmitting, submitError, isSuccess } =
    useTourFormSubmit({
      operatorId,
      tourId,
      initialValues,
    });

  useEffect(() => {
    if (tourData && isEditMode) {
      const allowedCurrencies = ['USD', 'EUR', 'UAH'] as const;
      const currency = allowedCurrencies.includes(
        tourData.currency as (typeof allowedCurrencies)[number],
      )
        ? (tourData.currency as (typeof allowedCurrencies)[number])
        : 'UAH';

      const values: TourFormValues = {
        ...tourData,
        currency,
        photos: tourData.photos.map<TourPhotoForm>((p) => ({
          ...p,
          file: null,
        })),
      };
      reset(values);
      setInitialValues(values);
    }
  }, [isEditMode, reset, tourData]);

  useEffect(() => {
    if (prevISO2Code && prevISO2Code !== ISO2Code) {
      setValue('cityId', 0);
    }
    setPrevISO2Code(ISO2Code);
  }, [ISO2Code, setValue, prevISO2Code]);

  if (tourDataLoading)
    return (
      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <CircularProgress size={48} />
      </Box>
    );
  const isFormLocked = isSubmitting || isSuccess;
  return (
    <Box
      sx={{
        width: '100%',
        paddingY: 5,
        paddingRight: { md: '224px' },
        position: 'relative',
        display: 'flex',
        justifyContent: { xs: 'center', md: 'flex-end' },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '686px',
        }}
      >
        <Typography variant="h1" textAlign="center" sx={{ mb: 4 }}>
          {isEditMode ? 'Редагувати тур' : 'Додати тур'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit(handleSubmitForm)}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            <TitleField
              control={control}
              errors={errors}
              clearErrors={clearErrors}
              disabled={isBooked}
            />
            <DescriptionField
              control={control}
              errors={errors}
              clearErrors={clearErrors}
            />
            <CountryField
              countries={countries}
              isLoading={countryLoading}
              control={control}
              errors={errors}
              clearErrors={clearErrors}
              disabled={isBooked}
            />
            <CityField
              cities={cities}
              isLoading={citiesLoading}
              control={control}
              errors={errors}
              clearErrors={clearErrors}
              disabled={isBooked || !ISO2Code}
            />
            <AvailableSpotsField
              control={control}
              errors={errors}
              clearErrors={clearErrors}
              modeEdit={isEditMode}
              trigger={trigger}
            />
            <PriceField
              control={control}
              errors={errors}
              clearErrors={clearErrors}
              trigger={trigger}
            />
            <DateRangeField
              control={control}
              errors={errors}
              clearErrors={clearErrors}
              start={start}
              end={end}
              disabled={isBooked}
            />
            <Photos
              control={control}
              errors={errors}
              clearErrors={clearErrors}
            />
          </Box>

          {submitError && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {submitError}
            </Alert>
          )}

          <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <SubmitButton
              textIdle={FORM_SUBMIT_BUTTON.textIdle}
              textLoading={FORM_SUBMIT_BUTTON.textLoading}
              textSuccess={FORM_SUBMIT_BUTTON.textSuccess}
              isLoading={isSubmitting}
              isSuccess={isSuccess}
              disabled={isFormLocked}
              sx={{ width: '200px' }}
            />
            <Button
              type="button"
              variant="outlined"
              size="large"
              sx={{ width: '200px' }}
              disabled={isFormLocked}
              onClick={() => {
                reset(initialValues ?? undefined);
                router.push(APP_ROUTE.OPERATOR_TOURS);
              }}
            >
              Скасувати
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
