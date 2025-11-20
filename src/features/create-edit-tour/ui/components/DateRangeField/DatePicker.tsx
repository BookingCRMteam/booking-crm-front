import { useRef, useState } from 'react';

import {
  Box,
  ClickAwayListener,
  Paper,
  Popper,
  TextField,
} from '@mui/material';
import { DateCalendar, PickersDay } from '@mui/x-date-pickers';
import { CalendarDotsIcon } from '@phosphor-icons/react';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type CustomDatePickerProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  placeholder: 'з' | 'по';
  error?: boolean;
  helperText?: string;
  disablePast?: boolean;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  disabled?: boolean;
  rangeStart?: Dayjs | null;
  rangeEnd?: Dayjs | null;
};

export const CustomDatePicker = <T extends FieldValues>({
  name,
  control,
  placeholder,
  error,
  helperText,
  disablePast = true,
  minDate,
  maxDate,
  disabled,
  rangeStart,
  rangeEnd,
}: CustomDatePickerProps<T>) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const value = field.value ? dayjs(field.value, 'YYYY-MM-DD') : null;

        const resolvedMinDate = minDate ?? (disablePast ? dayjs() : undefined);

        return (
          <Box sx={{ position: 'relative', width: '100%' }}>
            <Box ref={anchorRef} sx={{ position: 'relative', width: '100%' }}>
              <TextField
                value={
                  value ? `${placeholder} ${value.format('DD.MM.YYYY')}` : ''
                }
                placeholder={`${placeholder} ...`}
                error={error}
                helperText={helperText}
                disabled={disabled}
                onClick={() => !disabled && setOpen((prev) => !prev)}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                sx={{ '& input': { paddingLeft: '48px' } }}
                fullWidth
              />
              <CalendarDotsIcon
                size={24}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '16px',
                  pointerEvents: 'none',
                  color: '#555',
                }}
              />
            </Box>

            <Popper
              open={open}
              anchorEl={anchorRef.current}
              placement="bottom-start"
              sx={{
                width: anchorRef.current?.clientWidth ?? '100%',
                zIndex: 1400,
              }}
              modifiers={[
                { name: 'offset', options: { offset: [0, 4] } },
                { name: 'flip', enabled: false },
                { name: 'preventOverflow', options: { tether: false } },
                { name: 'computeStyles', options: { adaptive: false } },
              ]}
            >
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <Paper elevation={3} style={{ marginTop: 4 }}>
                  <DateCalendar
                    value={value || dayjs()}
                    onChange={(date) => {
                      field.onChange(date?.format('YYYY-MM-DD'));
                      setOpen(false);
                    }}
                    minDate={resolvedMinDate}
                    maxDate={maxDate}
                    slots={{ day: PickersDay }}
                    slotProps={{
                      day: (ownerState) => {
                        const day: Dayjs = ownerState.day;

                        const isInRange =
                          rangeStart &&
                          rangeEnd &&
                          day.isAfter(rangeStart.subtract(1, 'day')) &&
                          day.isBefore(rangeEnd.add(1, 'day'));

                        return {
                          sx: isInRange
                            ? {
                                backgroundColor: '#d1eaff',
                                borderRadius: '4px',
                              }
                            : {},
                        };
                      },
                    }}
                  />
                </Paper>
              </ClickAwayListener>
            </Popper>
          </Box>
        );
      }}
    />
  );
};
