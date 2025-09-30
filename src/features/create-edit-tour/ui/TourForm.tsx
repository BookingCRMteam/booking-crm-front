'use client';

import React, { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import { useCities } from '@/entities/city/model/useCities';
import { useCountries } from '@/entities/country/model/useCountries';
import { createTour, editTour } from '@/entities/tour/api/toursApi';
import { useFetchTour } from '@/entities/tour/model/useFetchTour';

import { transformBackendToFormValues } from '../lib/transformBackendToFormValues';
import { transformFormData } from '../lib/transformFormData';
import { TourFormSchema, TourFormValues } from '../model/schema';
import { AvailableSpotsField } from './components/AvailableSpotsField';
import { CityField } from './components/CityField';
import { CountryField } from './components/CountryField';
import { DateRangeField } from './components/DateRangeField';
import { DescriptionField } from './components/DescriptionField';
import { Photos } from './components/Photos';
import { PriceField } from './components/PriceField';
import { TitleField } from './components/TitleField';

type TourFormProps = {
  mode: 'create' | 'edit';
  tourId?: number;
  onClose?: () => void;
};

export const TourForm = ({
  mode = 'create',
  tourId,
  onClose,
}: TourFormProps) => {
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
      price: 0,
      currency: 'UAH',
      startDate: '',
      endDate: '',
      photos: [],
    },
  });

  const ISO2Code = watch('countryISO2Code');
  const priceData = watch('price');
  const start = watch('startDate');
  const end = watch('endDate');

  const [prevISO2Code, setPrevISO2Code] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  useEffect(() => {
    if (tourData && mode === 'edit') {
      console.log(tourData);
      reset(transformBackendToFormValues(tourData));
    }
  }, [mode, reset, tourData]);

  useEffect(() => {
    if (prevISO2Code && prevISO2Code !== ISO2Code) {
      setValue('cityId', 0);
    }
    setPrevISO2Code(ISO2Code);
  }, [ISO2Code, setValue, prevISO2Code]);

  const handleFormSubmit = async (data: TourFormValues) => {
    const initial =
      mode === 'edit' && tourId && tourData
        ? transformBackendToFormValues(tourData)
        : undefined;

    const formData = transformFormData(data, initial);

    setIsSubmitting(true);
    try {
      if (mode === 'create') {
        await createTour(formData);
      } else if (tourId) {
        await editTour(tourId, formData);
      }
      reset();
      onClose?.();
      setSubmitError(null);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Сталася помилка';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (tourDataLoading) return <CircularProgress size={48} />;

  return (
    <Box
      component="form"
      sx={{
        width: '100%',
        maxWidth: '1040px',
        margin: '0 auto',
      }}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Typography variant="h3" textAlign="center" sx={{ mb: 2, p: 1 }}>
        {mode === 'create' && 'Додати тур'}
        {mode === 'edit' && 'Редагувати тур'}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TitleField
          control={control}
          errors={errors}
          disabled={mode === 'edit'}
        />
        <DescriptionField control={control} errors={errors} />
        <CountryField
          countries={countries}
          isLoading={countryLoading}
          control={control}
          errors={errors}
          disabled={mode === 'edit'}
        />
        <CityField
          cities={cities}
          isLoading={citiesLoading}
          control={control}
          errors={errors}
          disabled={mode === 'edit'}
        />
        <AvailableSpotsField control={control} errors={errors} />
        <PriceField control={control} errors={errors} price={priceData} />
        <DateRangeField
          control={control}
          errors={errors}
          start={start}
          end={end}
          disabled={mode === 'edit'}
        />
        <Photos control={control} errors={errors} />
      </Box>

      {submitError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {'Помилка при збереженні туру, спробуйте, будь ласка, ще раз.'}
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button
          type="submit"
          variant="contained"
          sx={{ width: '238px', mt: 2 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} /> : 'Зберегти'}
        </Button>
        <Button
          type="button"
          onClick={() => {
            reset(
              mode === 'edit' && tourData
                ? transformBackendToFormValues(tourData)
                : undefined,
            );
            onClose?.();
          }}
          variant="outlined"
          sx={{ width: '238px', mt: 2 }}
        >
          Скасувати
        </Button>
      </Box>
    </Box>
  );
};
