import { Controller } from 'react-hook-form';

import { FieldProps } from '@/features/create-edit-tour/model/types';

import { City } from '@/entities/city';

import { DropdownField } from '@/shared/ui';

type CityFieldProps = FieldProps & {
  cities: City[];
  isLoading: boolean;
};

export const CityField = ({
  control,
  errors,
  cities,
  isLoading,
  disabled,
}: CityFieldProps) => {
  return (
    <Controller
      name="cityId"
      control={control}
      render={({ field }) => {
        const value = cities.find((c) => c.id === field.value) || null;

        return (
          <DropdownField
            items={cities}
            value={value}
            onChange={(city) => field.onChange(city.id)}
            onBlur={field.onBlur}
            getItemLabel={(c) => c.name}
            getItemId={(c) => c.id}
            label="Місто"
            placeholder="Оберіть місто"
            isLoading={isLoading}
            disabled={disabled}
            error={!!errors?.cityId}
            helperText={errors?.cityId?.message}
          />
        );
      }}
    />
  );
};
