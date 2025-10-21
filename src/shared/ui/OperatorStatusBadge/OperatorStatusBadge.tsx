'use client';

import { Box, BoxProps, Typography, styled } from '@mui/material';
import {
  CertificateIcon,
  ClockIcon,
  ProhibitInsetIcon,
} from '@phosphor-icons/react';

import { OperatorStatus } from '@/entities/operator';

interface OperatorStatusBadgeProps {
  status: OperatorStatus;
  className?: string;
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
  }
};
interface BadgeWrapper extends BoxProps {
  accentColor: number;
}
const BadgeWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})<BadgeWrapper>(({ theme, accentColor }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '1.2px 8px',
  borderRadius: '4px',
  width: '153px',
  gap: '4px',
  userSelect: 'none',
  color: theme.palette.common.black,
  backgroundColor: theme.palette.accent[accentColor],
  border: `1px solid ${theme.palette.primary.light}`,
}));

export const OperatorStatusBadge: React.FC<OperatorStatusBadgeProps> = ({
  status,
  className,
}) => {
  const { text, accentColor, Icon, rotate } = getStatusVisuals(status);

  return (
    <BadgeWrapper accentColor={accentColor} className={className}>
      <Icon style={{ transform: `rotate(${rotate})` }} size={24} />
      <Typography variant="bodyDefault">{text}</Typography>
    </BadgeWrapper>
  );
};
