import { type LinkProps, Menu, Link as MuLink, styled } from '@mui/material';

export const MuLinkStyled = styled(MuLink)<LinkProps>(({ theme }) => ({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  color: theme.palette.common.black,
}));

export const MenuStyled = styled(Menu)(({ theme }) => ({
  '& div.MuiMenu-paper': {
    borderRadius: 0,
  },
  '& ul.MuiMenu-list': {
    padding: '8px 20px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    boxShadow:
      '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 4px 8px 3px rgba(0, 0, 0, 0.15)',
    backgroundColor: theme.palette.common.white,
  },
}));
