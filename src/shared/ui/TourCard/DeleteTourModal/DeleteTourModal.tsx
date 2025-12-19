'use client';

import { Box, Button, Modal, Typography, styled } from '@mui/material';

import { CloseButton } from '@/shared/ui';

type DeleteTourModalProps = {
  title: string;
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const StyledModal = styled(Modal)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const ModalContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.common.white,
  borderRadius: '8px',
  width: '100%',
  maxWidth: '457px',
  padding: '60px 40px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  boxShadow: theme.shadows[24],
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
  },
}));

export const DeleteTourModal = ({
  title,
  open,
  isLoading,
  onClose,
  onConfirm,
}: DeleteTourModalProps) => {
  const dialogTitleId = 'delete-tour-dialog-title';
  const dialogDescriptionId = 'delete-tour-dialog-description';

  return (
    <StyledModal
      open={open}
      onClose={onClose}
      aria-labelledby={dialogTitleId}
      aria-describedby={dialogDescriptionId}
    >
      <ModalContent role="dialog" aria-modal="true">
        <CloseButton onClick={onClose} top={16} right={16} />
        <Typography id={dialogTitleId} variant="h3" align="center">
          Видалити тур?
        </Typography>
        <Box>
          <Typography
            id={dialogDescriptionId}
            component="p"
            variant="bodyLarge"
            align="center"
          >
            Ви впевнені, що хочете видалити тур
          </Typography>
          <Typography component="p" variant="bodyLarge" align="center">
            «{title}»?
          </Typography>
        </Box>
        <Typography component="p" variant="bodyLarge" align="center">
          Відновити його буде неможливо.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Button
            onClick={onConfirm}
            color="primary"
            variant="contained"
            disabled={isLoading}
            sx={{ width: '140px' }}
          >
            {isLoading ? 'Видалення...' : 'Видалити'}
          </Button>
          <Button
            onClick={onClose}
            color="secondary"
            variant="outlined"
            disabled={isLoading}
            sx={{ width: '140px' }}
          >
            Скасувати
          </Button>
        </Box>
      </ModalContent>
    </StyledModal>
  );
};
