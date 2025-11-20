'use client';

import { useRouter } from 'next/navigation';

import { useModalStore } from '@/features/modal/model/useModalStore';

import { APP_ROUTE } from '@/shared/constants';

import { ModalWrapper } from '../../ModalWrapper';
import { ModalVerificationFooter } from '../ModalVerificationFooter';
import { MODAL_VERIFICATION_REJECTED_TITLE } from '../constants';
import { OperatorVerificationRejectedView } from './OperatorVerificationRejectedView';

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
    <ModalWrapper
      title={MODAL_VERIFICATION_REJECTED_TITLE}
      footer={<ModalVerificationFooter />}
    >
      <OperatorVerificationRejectedView
        message={message}
        onRedirect={handleRedirectToOnboarding}
      />
    </ModalWrapper>
  );
};
