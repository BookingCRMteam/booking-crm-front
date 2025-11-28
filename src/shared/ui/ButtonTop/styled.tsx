import { IconButton, styled } from '@mui/material';

export const ButtonStyled = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: '50%',
  right: 20,
  transform: 'translateY(0)',
  opacity: 0,
  zIndex: 1000,
  color: theme.palette.common.black,
  backgroundColor: theme.palette.light[100],
  borderRadius: '50%',
  padding: '2px',
  '&:hover': {
    backgroundColor: theme.palette.light[200],
  },
  '&:focus-visible': {
    backgroundColor: theme.palette.light[300],
  },
  '&:active': {
    backgroundColor: theme.palette.light[400],
  },
  '&:disabled': {
    backgroundColor: theme.palette.gray[300],
  },
}));
