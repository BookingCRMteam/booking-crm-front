'use client';

import { Box, Button, Typography, styled } from '@mui/material';

import { useModalStore } from '../../model/useModalStore';
import {
  MODAL_VERIFICATION_FOOTER_BUTTON_TEXT,
  MODAL_VERIFICATION_FOOTER_TEXT,
} from './constants';

const SupportButton = styled(Button)(({ theme }) => ({
  ...theme.typography.bodyDefault,
  color: theme.palette.info.main,
  textTransform: 'none',
  padding: 0,
}));

const ModalVerificationWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
});

export const ModalVerificationFooter = () => {
  const open = useModalStore((s) => s.openModal);
  const handleOpenSupportModal = () => {
    open({ type: 'support-request-modal' });
  };
  return (
    <ModalVerificationWrapper>
      <Typography component="p" variant="bodyDefault">
        {MODAL_VERIFICATION_FOOTER_TEXT}
      </Typography>
      <SupportButton onClick={handleOpenSupportModal} variant="text">
        {MODAL_VERIFICATION_FOOTER_BUTTON_TEXT}
      </SupportButton>
    </ModalVerificationWrapper>
  );
};
