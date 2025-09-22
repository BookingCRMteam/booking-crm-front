import { Control, FieldErrors } from 'react-hook-form';

import { TourFormValues } from './schema';

export type FieldProps = {
  control: Control<TourFormValues>;
  errors?: FieldErrors<TourFormValues>;
  disabled?: boolean;
};
