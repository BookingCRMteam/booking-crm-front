import type { FC, ReactNode } from 'react';

import { IconButton, Tooltip } from '@mui/material';

type MenuTooltipProps = {
  children: ReactNode;
  title: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

export const MenuTooltip: FC<MenuTooltipProps> = ({
  onClick,
  title,
  children,
}) => {
  return (
    <Tooltip title={title}>
      <IconButton onClick={onClick} sx={{ p: 0 }} aria-label="user-menu">
        {children}
      </IconButton>
    </Tooltip>
  );
};
