'use client';

import type { ComponentType } from 'react';

import dynamic from 'next/dynamic';

import { type OperatorVerificationRejectedProps } from '../ui/OperatorVerificationRejected';

export type ModalPropsMap = {
  'operator-verification-pending': object;
  'operator-verification-success': object;
  'operator-verification-rejected': OperatorVerificationRejectedProps;
};

export type ModalType = keyof ModalPropsMap;

export const MODALS: {
  [K in ModalType]: ComponentType<ModalPropsMap[K]>;
} = {
  'operator-verification-pending': dynamic(
    () =>
      import('../ui/OperatorVerificationPending').then(
        (mod) => mod.OperatorVerificationPending,
      ),
    { ssr: false },
  ) as ComponentType<ModalPropsMap['operator-verification-pending']>,

  'operator-verification-success': dynamic(
    () =>
      import('../ui/OperatorVerificationSuccess').then(
        (mod) => mod.OperatorVerificationSuccess,
      ),
    { ssr: false },
  ) as ComponentType<ModalPropsMap['operator-verification-success']>,

  'operator-verification-rejected': dynamic(
    () =>
      import('../ui/OperatorVerificationRejected').then(
        (mod) => mod.OperatorVerificationRejected,
      ),
    { ssr: false },
  ) as ComponentType<ModalPropsMap['operator-verification-rejected']>,
};
