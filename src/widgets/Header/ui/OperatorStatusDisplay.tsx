import type { FC } from 'react';

import DoneIcon from '@mui/icons-material/Done';
import RotateRightRoundedIcon from '@mui/icons-material/RotateRightRounded';
import { Typography } from '@mui/material';

import type { OperatorStatus } from '@/entities/operator';

interface OperatorStatusDisplayProps {
  status: OperatorStatus;
}

export const OperatorStatusDisplay: FC<OperatorStatusDisplayProps> = ({
  status,
}) => {
  if (['rejected', 'pending'].includes(status)) {
    return (
      <Typography
        component="p"
        sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
      >
        <RotateRightRoundedIcon sx={{ fontSize: '18px' }} />
        Ваш статус на перевірці
      </Typography>
    );
  }

  return (
    <Typography
      component="p"
      sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}
    >
      <DoneIcon sx={{ fontSize: '18px' }} />
      Туроператор
    </Typography>
  );
};
