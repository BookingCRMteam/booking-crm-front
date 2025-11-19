import { useMemo, useRef, useState } from 'react';

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

import { Country } from '@/entities/country/model/types';

import { CountryFlag } from './CountryFlag';

type CountryFieldProps = FieldProps & {
  countries: Country[];
  isLoading: boolean;
};

export const CountryField = ({
  countries,
  isLoading,
  control,
  errors,
  disabled,
}: CountryFieldProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  const filteredCountries = useMemo(
    () =>
      countries.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [countries, search],
  );

  const open = Boolean(anchorEl);

  const handleOpen = () => {
    if (inputRef.current) setAnchorEl(inputRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearch('');
  };

  return (
    <Controller
      name="countryISO2Code"
      control={control}
      render={({ field }) => {
        const selectedCountry =
          countries.find((c) => c.iso2 === field.value) || null;

        return (
          <Box sx={{ position: 'relative' }}>
            <TextField
              label="Країна"
              placeholder="Оберіть країну"
              value={selectedCountry?.name || ''}
              inputRef={inputRef}
              onClick={handleOpen}
              disabled={disabled}
              error={!!errors?.countryISO2Code}
              helperText={errors?.countryISO2Code?.message as string}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={{
                width: '100%',
                '& input': {
                  paddingLeft: selectedCountry ? '48px' : '12px',
                  paddingRight: '48px',
                },
              }}
            />

            {selectedCountry && (
              <Box
                sx={{
                  position: 'absolute',
                  left: 4,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CountryFlag countryCode={selectedCountry.iso2} />
              </Box>
            )}

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

                      {filteredCountries.length ? (
                        filteredCountries.map((country) => (
                          <MenuItem
                            key={country.iso2}
                            onClick={() => {
                              field.onChange(country.iso2);
                              handleClose();
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                              }}
                            >
                              <CountryFlag countryCode={country.iso2} />
                              {country.name}
                            </Box>
                          </MenuItem>
                        ))
                      ) : (
                        <Box
                          sx={{ width: '100%', p: 2, color: 'text.secondary' }}
                        >
                          Країни не знайдено
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
