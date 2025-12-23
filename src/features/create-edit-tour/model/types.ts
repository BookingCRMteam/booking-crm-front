import {
  Control,
  FieldErrors,
  UseFormClearErrors,
  UseFormTrigger,
} from 'react-hook-form';

import { TourFormValues } from './schema';

export type FieldProps = {
  control: Control<TourFormValues>;
  errors?: FieldErrors<TourFormValues>;
  clearErrors?: UseFormClearErrors<TourFormValues>;
  trigger?: UseFormTrigger<TourFormValues>;
  disabled?: boolean;
};
