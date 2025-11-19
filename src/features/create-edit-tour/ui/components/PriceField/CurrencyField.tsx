import { Box, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

import { FieldProps } from '@/features/create-edit-tour/model/types';

export const CurrencyField = ({ control, disabled }: FieldProps) => {
  return (
    <Box sx={{ width: '75px' }}>
      <Controller
        name="currency"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            disabled={disabled}
            aria-readonly="true"
            sx={{ pointerEvents: 'none', '& input': { textAlign: 'center' } }}
          />
        )}
      />
    </Box>
  );
};
