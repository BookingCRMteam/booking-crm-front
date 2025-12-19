'use client';

import type { FC, ReactNode } from 'react';

import { Box, type BoxProps, Typography, styled } from '@mui/material';

import { ModalCloseButton } from './ModalCloseButton';

type ModalWrapperProps = {
  children: ReactNode;
  title: string;
  isBorder?: boolean;
  size?: 'small' | 'medium' | 'large';
  footer?: ReactNode;
};

type ModalWrapperBoxProps = BoxProps & {
  modalSize?: 'small' | 'medium' | 'large';
  isBorder?: boolean;
};

const ModalWrapperBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'modalSize' && prop !== 'isBorder',
})<ModalWrapperBoxProps>(({ modalSize, isBorder, theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  margin: '0 auto',
  padding:
    modalSize === 'small'
      ? '36px 24px'
      : modalSize === 'large'
        ? '60px 40px'
        : '36px 24px',
  position: 'relative',
  width:
    modalSize === 'small' ? '456px' : modalSize === 'large' ? '580px' : '456px',
  borderRadius: '8px',
  border: isBorder ? `1px solid ${theme.palette.common.black}` : 'none',
}));

export const ModalWrapper: FC<ModalWrapperProps> = ({
  children,
  title,
  footer,
  isBorder,
  size = 'medium',
}) => {
  return (
    <ModalWrapperBox modalSize={size} isBorder={isBorder}>
      <ModalCloseButton />
      <Typography component="h3" variant="h3">
        {title}
      </Typography>
      {children}
      {footer}
    </ModalWrapperBox>
  );
};
