'use client';

import { useRouter } from 'next/navigation';

import {
  Box,
  Button,
  Typography,
  type TypographyProps,
  styled,
} from '@mui/material';

import { useModalStore } from '@/features/modal/model/useModalStore';

import { APP_ROUTE } from '@/shared/constants';

import { ModalWrapper } from '../ModalWrapper';
import {
  MODAL_VERIFICATION_REJECTED_BUTTON_TEXT,
  MODAL_VERIFICATION_REJECTED_DESCRIPTION,
  MODAL_VERIFICATION_REJECTED_PLACEHOLDER_TEXT,
  MODAL_VERIFICATION_REJECTED_REASON_LABEL,
  MODAL_VERIFICATION_REJECTED_TITLE,
} from './constants';

const ErrorMessage = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: '16px',
  padding: '6px 16px',
  borderRadius: '4px',
  width: '100%',
  maxWidth: '408px',
  border: `1px solid ${theme.palette.common.black}`,
  color: theme.palette.gray[800],
}));

export type OperatorVerificationRejectedProps = {
  message: string;
};

export const OperatorVerificationRejected = ({
  message,
}: OperatorVerificationRejectedProps) => {
  const close = useModalStore((s) => s.closeModal);
  const router = useRouter();
  const handleRedirectToOnboarding = () => {
    close();
    router.push(APP_ROUTE.OPERATOR_ONBOARDING);
  };
  return (
    <ModalWrapper title={MODAL_VERIFICATION_REJECTED_TITLE} isSupportFooter>
      <Typography
        component="p"
        variant="bodyLarge"
        sx={{ alignSelf: 'flex-start' }}
      >
        {MODAL_VERIFICATION_REJECTED_DESCRIPTION}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          width: '100%',
        }}
      >
        <Typography component="p" variant="bodyDefault">
          {MODAL_VERIFICATION_REJECTED_REASON_LABEL}
        </Typography>
        <ErrorMessage component="p" variant="inputPlaceholder">
          {message || MODAL_VERIFICATION_REJECTED_PLACEHOLDER_TEXT}
        </ErrorMessage>
      </Box>
      <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={handleRedirectToOnboarding}
        sx={{ width: 'fit-content', margin: '0 auto' }}
      >
        {MODAL_VERIFICATION_REJECTED_BUTTON_TEXT}
      </Button>
    </ModalWrapper>
  );
};
