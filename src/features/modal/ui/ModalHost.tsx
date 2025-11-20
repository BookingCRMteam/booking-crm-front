'use client';

import { Suspense, useCallback, useMemo } from 'react';

import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  Slide,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';

import { useModalStore } from '@/features/modal/model/useModalStore';

import { MODALS } from '../registry/registry';

/* eslint-disable @typescript-eslint/no-explicit-any */

const Transition = (
  props: TransitionProps & { children: React.ReactElement },
) => <Slide direction="down" {...props} />;

export const ModalHost = () => {
  const { open, type, dismissible, payload, closeModal } = useModalStore(
    (s) => s,
  );

  const ModalComponent = useMemo(() => (type ? MODALS[type] : null), [type]);

  const handleClose = useCallback(
    (_: unknown, reason?: 'backdropClick' | 'escapeKeyDown') => {
      if (!dismissible) return;
      if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
        closeModal();
      } else {
        closeModal();
      }
    },
    [dismissible, closeModal],
  );

  if (!type || !ModalComponent) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slots={{ transition: Transition }}
      sx={{ width: 'fit-content', margin: '0 auto', borderRadius: 0 }}
      slotProps={{
        paper: {
          sx: { borderRadius: 0 },
        },
      }}
      keepMounted
      // disableScrollLock
      aria-labelledby="app-modal-title"
    >
      <DialogContent sx={{ p: 0, width: 'fit-content' }}>
        <Suspense
          fallback={
            <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          }
        >
          <ModalComponent {...(payload as any)} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
