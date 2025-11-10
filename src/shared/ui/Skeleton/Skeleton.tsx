import { type FC } from 'react';

import {
  Skeleton as SkeletonMui,
  type SkeletonProps,
  styled,
} from '@mui/material';

const SkeletonMuiStyled = styled(SkeletonMui)(({ theme }) => ({
  backgroundColor: theme.palette.gray[200],
}));

export const Skeleton: FC<SkeletonProps> = (props) => {
  return <SkeletonMuiStyled {...props} />;
};
