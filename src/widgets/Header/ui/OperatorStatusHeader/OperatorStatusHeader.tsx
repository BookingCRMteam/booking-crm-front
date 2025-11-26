'use client';

import {
  Box,
  type BoxProps,
  type Theme,
  Typography,
  styled,
} from '@mui/material';
import {
  CertificateIcon,
  SpinnerIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react';

import type { OperatorStatus } from '@/entities/operator';

import { OPERATOR_STATUS_ID } from './constants';

interface OperatorStatusHeaderProps {
  status: OperatorStatus;
}

const STATUS_MAP = {
  approved: {
    text: 'Верифіковано',
    Icon: CertificateIcon,
    bg: (theme: Theme) => theme.palette.accent[3],
    color: (theme: Theme) => theme.palette.common.black,
    border: (theme: Theme) => theme.palette.primaryExtended[700],
  },
  pending: {
    text: 'На перевірці',
    Icon: SpinnerIcon,
    bg: (theme: Theme) => theme.palette.light[300],
    color: (theme: Theme) => theme.palette.common.black,
    border: (theme: Theme) => theme.palette.primaryExtended[700],
  },
  rejected: {
    text: 'Відхилено',
    Icon: WarningCircleIcon,
    bg: () => 'rgba(255, 221, 210, 0.5)',
    color: (theme: Theme) => theme.palette.error.main,
    border: (theme: Theme) => theme.palette.accent[1],
  },
} as const;

const getStatusVisuals = (status: OperatorStatus) =>
  STATUS_MAP[status] ?? STATUS_MAP.pending;

interface BadgeWrapperProps extends BoxProps {
  status: OperatorStatus;
}

const BadgeWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status',
})<BadgeWrapperProps>(({ theme, status }) => {
  const conf = getStatusVisuals(status);
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '5.8px 3.5px',
    borderRadius: '4px',
    userSelect: 'none',
    width: '100%',
    maxWidth: '123px',
    backgroundColor: conf.bg(theme),
    color: conf.color(theme),
    border: `1px solid ${conf.border(theme)}`,
  };
});
const ICON_SIZE = 16;
export const OperatorStatusHeader = ({ status }: OperatorStatusHeaderProps) => {
  const { text, Icon } = getStatusVisuals(status);

  return (
    <BadgeWrapper status={status} data-testid={OPERATOR_STATUS_ID}>
      <Icon size={ICON_SIZE} />
      <Typography variant="bodySmall">{text}</Typography>
    </BadgeWrapper>
  );
};
