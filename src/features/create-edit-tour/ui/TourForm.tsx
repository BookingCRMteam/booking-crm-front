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

import { APP_ROUTE } from '@/shared/constants';

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
  onClose?: () => void;
};

type TourFormMode = 'create' | 'edit';

export const TourForm = ({ operatorId, tourId }: TourFormProps) => {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
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
  });

  const mode: TourFormMode = tourId ? 'edit' : 'create';

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
    tourId ?? 0,
    mode === 'edit' && !!tourId,
  );

  const { handleSubmitForm, isSubmitting, submitError } = useTourFormSubmit(
    mode,
    operatorId,
    tourId,
    initialValues,
  );

  useEffect(() => {
    if (tourData && mode === 'edit') {
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
  }, [mode, reset, tourData]);

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

  return (
    <Box
      sx={{
        width: '100%',
        paddingY: 5,
        paddingRight: '224px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '686px',
        }}
      >
        <Typography variant="h1" textAlign="center" sx={{ mb: 4 }}>
          {mode === 'create' && 'Додати тур'}
          {mode === 'edit' && 'Редагувати тур'}
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
              disabled={mode === 'edit'} //??
            />
            <DescriptionField control={control} errors={errors} />
            <CountryField
              countries={countries}
              isLoading={countryLoading}
              control={control}
              errors={errors}
              disabled={mode === 'edit'} //??
            />
            <CityField
              cities={cities}
              isLoading={citiesLoading}
              control={control}
              errors={errors}
              disabled={mode === 'edit' || !ISO2Code} //??
            />
            <AvailableSpotsField
              control={control}
              errors={errors}
              mode={mode}
            />
            <PriceField control={control} errors={errors} />
            <DateRangeField
              control={control}
              errors={errors}
              start={start}
              end={end}
              disabled={mode === 'edit'} //??
            />
            <Photos control={control} errors={errors} />
          </Box>

          {submitError && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {submitError}
            </Alert>
          )}

          <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: '200px' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} /> : 'Зберегти'}
            </Button>
            <Button
              type="button"
              onClick={() => {
                reset(initialValues ?? undefined);
                router.push(APP_ROUTE.OPERATOR_TOURS);
              }}
              variant="outlined"
              sx={{ width: '200px' }}
              disabled={isSubmitting}
            >
              Скасувати
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
