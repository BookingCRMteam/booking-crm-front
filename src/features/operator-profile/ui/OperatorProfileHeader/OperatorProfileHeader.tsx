import type { FC, ReactNode } from 'react';

import { Box, styled } from '@mui/material';

const HeaderWrapper = styled(Box)({
  display: 'flex',
  gap: '32px',
  margin: '0 auto',
});

type OperatorProfileHeaderProps = {
  children: ReactNode;
};
export const OperatorProfileHeader: FC<OperatorProfileHeaderProps> = ({
  children,
}) => {
  return <HeaderWrapper>{children}</HeaderWrapper>;
};
