import Link from 'next/link';

import { Button, Typography } from '@mui/material';

import { APP_ROUTE } from '@/shared/constants';

import { ModalWrapper } from '../ModalWrapper';
import {
  MODAL_VERIFICATION_SUCCESS_BUTTON_TEXT,
  MODAL_VERIFICATION_SUCCESS_DESCRIPTION,
  MODAL_VERIFICATION_SUCCESS_TITLE,
} from './constants';

export const OperatorVerificationSuccess = () => {
  return (
    <ModalWrapper isSupportFooter title={MODAL_VERIFICATION_SUCCESS_TITLE}>
      <Typography
        component="p"
        variant="bodyLarge"
        sx={{ textAlign: 'center', maxWidth: '370px' }}
      >
        {MODAL_VERIFICATION_SUCCESS_DESCRIPTION}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        LinkComponent={Link}
        href={APP_ROUTE.OPERATOR}
        sx={{ width: 'fit-content' }}
      >
        {MODAL_VERIFICATION_SUCCESS_BUTTON_TEXT}
      </Button>
    </ModalWrapper>
  );
};
