'use client';

import type { ComponentType } from 'react';

import dynamic from 'next/dynamic';

import { type OperatorVerificationRejectedProps } from '../ui/OperatorVerification/OperatorVerificationRejected';

export type ModalPropsMap = {
  'operator-verification-pending': object;
  'operator-verification-success': object;
  'operator-verification-rejected': OperatorVerificationRejectedProps;
  'support-request-modal': object;
};

export type ModalType = keyof ModalPropsMap;

export const MODALS: {
  [K in ModalType]: ComponentType<ModalPropsMap[K]>;
} = {
  'operator-verification-pending': dynamic(
    () =>
      import('../ui/OperatorVerification/OperatorVerificationPending').then(
        (mod) => mod.OperatorVerificationPending,
      ),
    { ssr: false },
  ) as ComponentType<ModalPropsMap['operator-verification-pending']>,

  'operator-verification-success': dynamic(
    () =>
      import('../ui/OperatorVerification/OperatorVerificationSuccess').then(
        (mod) => mod.OperatorVerificationSuccess,
      ),
    { ssr: false },
  ) as ComponentType<ModalPropsMap['operator-verification-success']>,

  'operator-verification-rejected': dynamic(
    () =>
      import('../ui/OperatorVerification/OperatorVerificationRejected').then(
        (mod) => mod.OperatorVerificationRejected,
      ),
    { ssr: false },
  ) as ComponentType<ModalPropsMap['operator-verification-rejected']>,
  'support-request-modal': dynamic(
    () =>
      import('../ui/SupportRequestModal/ui/SupportRequestModal').then(
        (mod) => mod.SupportRequestModal,
      ),
    { ssr: false },
  ) as ComponentType<ModalPropsMap['support-request-modal']>,
};
