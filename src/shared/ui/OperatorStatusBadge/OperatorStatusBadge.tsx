'use client';

import { Box, BoxProps, Typography, styled } from '@mui/material';
import {
  CertificateIcon,
  ClockIcon,
  ProhibitInsetIcon,
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
        rotate: '0',
      };
    case 'pending':
      return {
        text: 'На перевірці',
        accentColor: 2,
        Icon: ClockIcon,
        rotate: '0',
      };
    case 'rejected':
      return {
        text: 'Відхилено',
        accentColor: 1,
        Icon: ProhibitInsetIcon,
        rotate: '-45deg',
      };
    default: {
      return {
        text: 'Невідомий',
        accentColor: 3,
        Icon: CertificateIcon,
        rotate: '0',
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
  padding: isSmall ? '0px 4px' : '1.2px 8px',
  borderRadius: '4px',
  width: isSmall ? '121px' : '153px',
  gap: isSmall ? '2px' : '4px',
  userSelect: 'none',
  color: theme.palette.common.black,
  backgroundColor: theme.palette.accent[accentColor],
  border: `1px solid ${theme.palette.primary.light}`,
}));

export const OperatorStatusBadge: React.FC<OperatorStatusBadgeProps> = ({
  status,
  className,
  size = 'medium',
}) => {
  const { text, accentColor, Icon, rotate } = getStatusVisuals(status);
  const isSmall = size === 'small';
  const iconSize = isSmall ? 16 : 24;
  const typographyVariant = isSmall ? 'bodySmall' : 'bodyDefault';
  return (
    <BadgeWrapper
      accentColor={accentColor}
      className={className}
      isSmall={isSmall}
    >
      <Icon style={{ transform: `rotate(${rotate})` }} size={iconSize} />
      <Typography variant={typographyVariant}>{text}</Typography>
    </BadgeWrapper>
  );
};
