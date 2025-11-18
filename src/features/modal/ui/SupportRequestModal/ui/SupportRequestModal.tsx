'use client';

import { useModalStore } from '@/features/modal/model/useModalStore';

import { ModalWrapper } from '../../ModalWrapper';
import { SupportRequestView } from './SupportRequestView';
import { SUPPORT_REQUEST_MODAL_TITLE } from './constants';

export const SupportRequestModal = () => {
  const close = useModalStore((s) => s.closeModal);

  // TODO: implement actual support request logic with react-hook-form and remove console.log
  const handleSendRequest = () => {
    console.log('Submit support request');
    close();
  };
  return (
    <ModalWrapper title={SUPPORT_REQUEST_MODAL_TITLE}>
      <SupportRequestView onSendRequest={handleSendRequest} />
    </ModalWrapper>
  );
};
