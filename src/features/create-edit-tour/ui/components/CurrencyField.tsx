import { Box, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';

import { FieldProps } from '@/features/create-edit-tour/model/types';

export const CurrencyField = ({ control }: FieldProps) => {
  return (
    <Box sx={{ width: 100 }}>
      <Controller
        name="currency"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            value={field.value ?? 'UAH'}
            sx={{
              width: '100%',
              '.MuiSelect-select': {
                paddingRight: '0px',
              },
            }}
          >
            <MenuItem value="UAH">UAH</MenuItem>/
          </Select>
        )}
      />
    </Box>
  );
};
