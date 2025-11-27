'use client';

import type { FC } from 'react';

import {
  Box,
  Button,
  type ButtonProps,
  CircularProgress,
  styled,
} from '@mui/material';
import { CheckFatIcon } from '@phosphor-icons/react';

const LoadingIndicatorWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.common.white,
  justifyContent: 'center',
}));

interface ButtonStyledProps extends ButtonProps {
  isSuccess: boolean;
}

const ButtonStyled = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isSuccess',
})<ButtonStyledProps>(({ theme, isSuccess }) => ({
  width: '332px',
  height: '37px',

  '&.MuiButton-loading': {
    backgroundColor: theme.palette.primaryExtended[900],
    color: theme.palette.common.white,
  },

  '&:not(.MuiButton-loading):disabled': isSuccess
    ? {
        backgroundColor: theme.palette.primaryExtended[800],
        color: theme.palette.common.white,
      }
    : {
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
        color: 'rgba(0, 0, 0, 0.38)',
      },
}));

type SubmitButtonProps = ButtonProps & {
  textIdle: string;
  textLoading: string;
  textSuccess: string;
  isLoading: boolean;
  isSuccess: boolean;
};

export const SubmitButton: FC<SubmitButtonProps> = ({
  textIdle,
  textLoading,
  textSuccess,
  isLoading,
  isSuccess,
  ...props
}) => {
  const customLoadingIndicator = (
    <LoadingIndicatorWrapper>
      <CircularProgress size={22} thickness={6} color="inherit" />
      {textLoading}
    </LoadingIndicatorWrapper>
  );

  const buttonText = isSuccess ? textSuccess : textIdle;

  return (
    <ButtonStyled
      type="submit"
      variant="contained"
      size="large"
      color="primary"
      isSuccess={isSuccess}
      loading={isLoading}
      disabled={isSuccess || props.disabled}
      startIcon={
        isSuccess ? <CheckFatIcon weight="fill" size={24} /> : props.startIcon
      }
      loadingIndicator={customLoadingIndicator}
      loadingPosition="center"
      {...props}
    >
      {!isLoading && buttonText}
    </ButtonStyled>
  );
};
