'use client';

import { useState } from 'react';

import { Box, Button, Modal } from '@mui/material';

import { TourForm } from '@/features/create-edit-tour';

export const TourFormButtons = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [editingTourId, setEditingTourId] = useState<number | undefined>(
    undefined,
  );

  const handleOpenCreate = () => {
    setMode('create');
    setEditingTourId(undefined);
    setOpen(true);
  };

  const handleOpenEdit = (tourId: number) => {
    setMode('edit');
    setEditingTourId(tourId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', gap: '20px' }}>
      <Button variant="contained" onClick={handleOpenCreate}>
        Створити тур
      </Button>

      <Button variant="outlined" onClick={() => handleOpenEdit(31)}>
        Редагувати тур
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            p: 4,
            width: '90%',
            maxWidth: 1040,
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: 2,
          }}
        >
          <TourForm mode={mode} tourId={editingTourId} onClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
};
