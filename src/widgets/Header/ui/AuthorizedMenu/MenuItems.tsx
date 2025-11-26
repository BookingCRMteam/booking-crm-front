import type { FC, ReactNode } from 'react';

import { MenuStyled } from './styled';

type MenuItemsProps = {
  anchorElUser: null | HTMLElement;
  onClose: () => void;
  children: ReactNode;
};

export const MenuItems: FC<MenuItemsProps> = ({
  anchorElUser,
  onClose,
  children,
}) => {
  return (
    <MenuStyled
      id="menu-appbar"
      disableScrollLock
      anchorEl={anchorElUser}
      anchorOrigin={{ vertical: 45.5, horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(anchorElUser)}
      onClose={onClose}
    >
      {children}
    </MenuStyled>
  );
};
