import { Typography } from '@mui/material';

import { ModalWrapper } from '../ModalWrapper';
import {
  MODAL_VERIFICATION_PENDING_DESCRIPTION,
  MODAL_VERIFICATION_PENDING_TITLE,
} from './constants';

export const OperatorVerificationPending = () => {
  return (
    <ModalWrapper title={MODAL_VERIFICATION_PENDING_TITLE} isSupportFooter>
      <Typography
        component="p"
        variant="bodyLarge"
        sx={{ textAlign: 'center' }}
      >
        {MODAL_VERIFICATION_PENDING_DESCRIPTION}
      </Typography>
    </ModalWrapper>
  );
};
