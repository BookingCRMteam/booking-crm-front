'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

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

type DropdownFieldProps<T> = {
  items: T[];
  value: T | null;
  onChange: (item: T) => void;
  onBlur?: () => void;
  getItemLabel: (item: T) => string;
  getItemId: (item: T) => string | number;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  renderItem?: (item: T, isActive: boolean) => React.ReactNode;
  inputAdornment?: React.ReactNode;
  error?: boolean;
  helperText?: string;
};

export const DropdownField = <T,>({
  items,
  value,
  onChange,
  onBlur,
  getItemLabel,
  getItemId,
  renderItem,
  inputAdornment,
  label,
  placeholder,
  disabled,
  isLoading,
  error,
  helperText,
}: DropdownFieldProps<T>) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [search, setSearch] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);

  const filtered = useMemo(
    () =>
      items.filter((i) =>
        getItemLabel(i).toLowerCase().includes(search.toLowerCase()),
      ),
    [items, getItemLabel, search],
  );

  useEffect(() => {
    if (!open || filtered.length === 0) return;
    const idx = value
      ? filtered.findIndex((i) => getItemId(i) === getItemId(value))
      : 0;
    setHighlightedIndex(idx >= 0 ? idx : 0);

    requestAnimationFrame(() => {
      const item = listRef.current?.querySelector(`[data-index="${idx}"]`);
      if (item) (item as HTMLElement).scrollIntoView({ block: 'nearest' });
    });
  }, [open, filtered, value, getItemId]);

  useEffect(() => {
    if (!listRef.current) return;
    const item = listRef.current.querySelector(
      `[data-index="${highlightedIndex}"]`,
    );
    if (item) (item as HTMLElement).scrollIntoView({ block: 'nearest' });
  }, [highlightedIndex]);

  const handleOpen = () => {
    if (disabled) return;
    if (inputRef.current) setAnchorEl(inputRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearch('');
    onBlur?.();
  };

  const handleSelect = (item: T) => {
    onChange(item);
    handleClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && (e.key === 'Enter' || e.key === 'ArrowDown')) {
      handleOpen();
      e.preventDefault();
      return;
    }
    if (!open) return;

    if (e.key === 'ArrowDown') {
      setHighlightedIndex((p) => (p < filtered.length - 1 ? p + 1 : 0));
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((p) => (p > 0 ? p - 1 : filtered.length - 1));
      e.preventDefault();
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      handleSelect(filtered[highlightedIndex]);
      e.preventDefault();
    } else if (e.key === 'Escape') {
      handleClose();
      e.preventDefault();
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField
        label={label}
        placeholder={placeholder}
        value={value ? getItemLabel(value) : ''}
        inputRef={inputRef}
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        error={error}
        helperText={helperText}
        fullWidth
        sx={{
          '& input': {
            paddingLeft: inputAdornment ? '48px' : undefined,
            paddingRight: '48px',
          },
        }}
        slotProps={{
          input: {
            readOnly: true,
          },
          inputLabel: {
            shrink: Boolean(value),
          },
        }}
      />

      {inputAdornment && (
        <Box
          sx={{
            position: 'absolute',
            left: 10,
            top: '14px',
            pointerEvents: 'none',
          }}
        >
          {inputAdornment}
        </Box>
      )}

      <IconButton
        size="small"
        disabled={disabled}
        onClick={open ? handleClose : handleOpen}
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
        sx={{ width: inputRef.current?.clientWidth, zIndex: 1400 }}
        modifiers={[
          { name: 'offset', options: { offset: [0, 4] } },
          { name: 'flip', enabled: false },
          { name: 'preventOverflow', options: { tether: false } },
          { name: 'computeStyles', options: { adaptive: false } },
        ]}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Paper
            ref={listRef}
            style={{ maxHeight: 300, overflowY: 'auto' }}
            role="listbox"
          >
            <Box
              sx={{
                p: 1,
                position: 'sticky',
                top: 0,
                backgroundColor: 'background.paper',
                zIndex: 1,
              }}
            >
              <TextField
                placeholder="Пошук..."
                size="small"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete="off"
              />
            </Box>

            {isLoading ? (
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress size={28} />
              </Box>
            ) : filtered.length ? (
              filtered.map((item, index) => (
                <MenuItem
                  key={getItemId(item)}
                  data-index={index}
                  selected={index === highlightedIndex}
                  onClick={() => handleSelect(item)}
                  sx={{
                    backgroundColor:
                      index === highlightedIndex ? 'primary.light' : 'inherit',
                  }}
                >
                  {renderItem
                    ? renderItem(item, index === highlightedIndex)
                    : getItemLabel(item)}
                </MenuItem>
              ))
            ) : (
              <Box sx={{ width: '100%', p: 2, color: 'text.secondary' }}>
                Не знайдено
              </Box>
            )}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};
