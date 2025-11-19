import { Box, FormLabel } from '@mui/material';
import dayjs from 'dayjs';

import { FieldProps } from '@/features/create-edit-tour/model/types';

import { TourFormValues } from '../../../model/schema';
import { CustomDatePicker } from './DatePicker';

type DateRangeFieldProps = FieldProps & {
  start: string;
  end: string;
};

export const DateRangeField = ({
  control,
  errors,
  start,
  end,
  disabled,
}: DateRangeFieldProps) => {
  return (
    <Box>
      <FormLabel
        component="legend"
        sx={(theme) => ({
          ...theme.typography.inputPlaceholder,
          fontSize: '16px',
          color: theme.palette.gray[700],
          mb: '10px',
        })}
      >
        Дата
      </FormLabel>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 3,
        }}
      >
        <CustomDatePicker<TourFormValues>
          name="startDate"
          control={control}
          error={!!errors?.startDate}
          helperText={errors?.startDate?.message as string}
          disablePast
          placeholder="з"
          maxDate={end ? dayjs(end, 'YYYY-MM-DD') : undefined}
          disabled={disabled}
          rangeStart={start ? dayjs(start) : null}
          rangeEnd={end ? dayjs(end) : null}
        />

        <CustomDatePicker<TourFormValues>
          name="endDate"
          control={control}
          error={!!errors?.endDate}
          helperText={errors?.endDate?.message as string}
          disablePast
          placeholder="по"
          minDate={start ? dayjs(start, 'YYYY-MM-DD') : undefined}
          disabled={disabled}
          rangeStart={start ? dayjs(start) : null}
          rangeEnd={end ? dayjs(end) : null}
        />
      </Box>
    </Box>
  );
};
