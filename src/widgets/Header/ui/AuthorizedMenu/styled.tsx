import { type LinkProps, Menu, Link as MuLink, styled } from '@mui/material';

const ELEVATED_SHADOW =
  '0 1px 3px 1px rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.3)';

export const MuLinkStyled = styled(MuLink)<LinkProps>(({ theme }) => ({
  display: 'flex',
  gap: '8px',
  padding: '12px 20px',
  alignItems: 'center',
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  transition: 'background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.gray[50],
    boxShadow: ELEVATED_SHADOW,
  },
  '&:focus-visible': {
    backgroundColor: theme.palette.gray[50],
    boxShadow: ELEVATED_SHADOW,

    '& .MuiTypography-root': {
      textDecoration: 'underline',
    },
  },
  '&:active': {
    backgroundColor: theme.palette.gray[200],
    boxShadow: ELEVATED_SHADOW,
  },
}));

export const MenuStyled = styled(Menu)(({ theme }) => ({
  '& div.MuiMenu-paper': {
    borderRadius: 0,
  },
  '& ul.MuiMenu-list': {
    padding: '4px 0 8px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow:
      '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 4px 8px 3px rgba(0, 0, 0, 0.15)',
    backgroundColor: theme.palette.common.white,
  },
}));
