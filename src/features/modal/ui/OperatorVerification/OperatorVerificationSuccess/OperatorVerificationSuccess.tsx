'use client';

import { useRouter } from 'next/navigation';

import { useModalStore } from '@/features/modal/model/useModalStore';

import { APP_ROUTE } from '@/shared/constants';

import { ModalWrapper } from '../../ModalWrapper';
import { ModalVerificationFooter } from '../ModalVerificationFooter';
import { OperatorVerificationSuccessView } from './OperatorVerificationSuccessView';
import { MODAL_VERIFICATION_SUCCESS_TITLE } from './constants';

export const OperatorVerificationSuccess = () => {
  const close = useModalStore((s) => s.closeModal);
  const router = useRouter();
  const handleRedirectToTours = () => {
    close();
    router.push(APP_ROUTE.OPERATOR_TOURS);
  };
  return (
    <ModalWrapper
      title={MODAL_VERIFICATION_SUCCESS_TITLE}
      footer={<ModalVerificationFooter />}
    >
      <OperatorVerificationSuccessView onRedirect={handleRedirectToTours} />
    </ModalWrapper>
  );
};
