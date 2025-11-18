'use client';

import type { FC } from 'react';

import { Box, Typography, styled } from '@mui/material';

import { ModalCloseButton } from './ModalCloseButton';
import { ModalVerificationFooter } from './OperatorVerification/ModalVerificationFooter';

type ModalWrapperProps = {
  children: React.ReactNode;
  title: string;
  isSupportFooter?: boolean;
};

const ModalWrapperBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  width: '456px',
  margin: '0 auto',
  padding: '36px 24px',
  position: 'relative',
});

export const ModalWrapper: FC<ModalWrapperProps> = ({
  children,
  title,
  isSupportFooter = false,
}) => {
  return (
    <ModalWrapperBox>
      <ModalCloseButton />
      <Typography component="h3" variant="h3">
        {title}
      </Typography>
      {children}
      {isSupportFooter && <ModalVerificationFooter />}
    </ModalWrapperBox>
  );
};
