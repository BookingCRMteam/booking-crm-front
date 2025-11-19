import React, { useMemo, useRef, useState } from 'react';

import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  ClickAwayListener,
  IconButton,
  MenuItem,
  Paper,
  Popper,
  TextField,
} from '@mui/material';
import { Controller } from 'react-hook-form';

import { FieldProps } from '@/features/create-edit-tour/model/types';

import { City } from '@/entities/city/model/types';

type CityFieldProps = FieldProps & {
  cities: City[];
  isLoading: boolean;
};

export const CityField = ({
  cities,
  isLoading,
  control,
  errors,
  disabled,
}: CityFieldProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [search, setSearch] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  const open = Boolean(anchorEl);

  const handleOpen = () => {
    if (disabled) return;
    if (inputRef.current) setAnchorEl(inputRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearch('');
  };

  const filteredCities = useMemo(
    () =>
      cities.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [cities, search],
  );

  return (
    <Controller
      name="cityId"
      control={control}
      render={({ field }) => {
        const selectedCity = cities.find((c) => c.id === field.value) || null;

        return (
          <Box sx={{ position: 'relative', width: '100%' }}>
            <TextField
              label="Місто"
              placeholder="Оберіть місто"
              value={selectedCity?.name || ''}
              inputRef={inputRef}
              onClick={handleOpen}
              disabled={disabled}
              error={!!errors?.cityId}
              helperText={errors?.cityId?.message as string}
              slotProps={{
                input: {
                  readOnly: true,
                },
                inputLabel: {
                  shrink: Boolean(field.value),
                },
              }}
              sx={{
                width: '100%',
                '& input': {
                  paddingRight: '48px',
                },
              }}
            />

            <IconButton
              size="small"
              onClick={open ? handleClose : handleOpen}
              disabled={disabled}
              sx={{
                position: 'absolute',
                right: 4,
                top: '8px',
                width: 40,
                height: 40,
              }}
            >
              <ArrowDropDownIcon />
            </IconButton>

            <Popper
              open={open}
              anchorEl={anchorEl}
              placement="bottom-start"
              sx={{
                width: inputRef.current ? inputRef.current.clientWidth : '100%',
                zIndex: 1400,
              }}
              modifiers={[
                { name: 'offset', options: { offset: [0, 4] } },
                { name: 'flip', enabled: false },
                { name: 'preventOverflow', options: { tether: false } },
                { name: 'computeStyles', options: { adaptive: false } },
              ]}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Paper style={{ maxHeight: 300, overflowY: 'auto' }}>
                  {isLoading ? (
                    <Box
                      sx={{ p: 2, display: 'flex', justifyContent: 'center' }}
                    >
                      <CircularProgress size={28} />
                    </Box>
                  ) : (
                    <>
                      <Box sx={{ p: 1 }}>
                        <TextField
                          placeholder="Пошук..."
                          size="small"
                          fullWidth
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          autoComplete="off"
                        />
                      </Box>

                      {filteredCities.length ? (
                        filteredCities.map((city) => (
                          <MenuItem
                            key={city.id}
                            onClick={() => {
                              field.onChange(city.id);
                              handleClose();
                            }}
                          >
                            {city.name}
                          </MenuItem>
                        ))
                      ) : (
                        <Box
                          sx={{ width: '100%', p: 2, color: 'text.secondary' }}
                        >
                          Міст не знайдено
                        </Box>
                      )}
                    </>
                  )}
                </Paper>
              </ClickAwayListener>
            </Popper>
          </Box>
        );
      }}
    />
  );
};
