'use client';

import { Box, BoxProps, Typography, styled } from '@mui/material';
import {
  CertificateIcon,
  SpinnerIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react';

import { OperatorStatus } from '@/entities/operator';

type OperatorStatusBadgeSize = 'small' | 'medium';
interface OperatorStatusBadgeProps {
  status: OperatorStatus;
  className?: string;
  size?: OperatorStatusBadgeSize;
}

const getStatusVisuals = (status: OperatorStatus) => {
  switch (status) {
    case 'approved':
      return {
        text: 'Верифіковано',
        accentColor: 3,
        Icon: CertificateIcon,
      };
    case 'pending':
      return {
        text: 'На перевірці',
        accentColor: 2,
        Icon: SpinnerIcon,
      };
    case 'rejected':
      return {
        text: 'Відхилено',
        accentColor: 1,
        Icon: WarningCircleIcon,
      };
    default: {
      return {
        text: 'Невідомий',
        accentColor: 3,
        Icon: CertificateIcon,
      };
    }
  }
};
interface BadgeWrapper extends BoxProps {
  accentColor: number;
  isSmall: boolean;
}
const BadgeWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accentColor' && prop !== 'isSmall',
})<BadgeWrapper>(({ theme, accentColor, isSmall }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0px 3.5px',
  height: isSmall ? 'fit-content' : '31px',
  borderRadius: '4px',
  width: isSmall ? '121px' : 'fit-content',
  gap: isSmall ? '2px' : '4px',
  userSelect: 'none',
  color: theme.palette.common.black,
  backgroundColor: theme.palette.accent[accentColor],
  border: `1px solid ${theme.palette.primaryExtended[700]}`,
}));

export const OperatorStatusBadge: React.FC<OperatorStatusBadgeProps> = ({
  status,
  className,
  size = 'medium',
}) => {
  const { text, accentColor, Icon } = getStatusVisuals(status);
  const isSmall = size === 'small';
  return (
    <BadgeWrapper
      accentColor={accentColor}
      className={className}
      isSmall={isSmall}
    >
      <Icon size={16} />
      <Typography variant="bodySmall">{text}</Typography>
    </BadgeWrapper>
  );
};
