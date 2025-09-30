'use client';

import { Inter, Nunito_Sans, Roboto, Unbounded } from 'next/font/google';

import { createTheme } from '@mui/material';

import { customPalette } from './customColors';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});
const nunitoSans = Nunito_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});
const unbounded = Unbounded({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const theme = createTheme({
  colorSchemes: { light: true, dark: false },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  typography: {
    fontFamily: [
      roboto.style.fontFamily,
      inter.style.fontFamily,
      unbounded.style.fontFamily,
      nunitoSans.style.fontFamily,
    ].join(','),
    h1: {
      fontSize: 32,
      fontFamily: 'Unbounded, sans-serif',
      fontWeight: 700,
      letterSpacing: '0%',
      lineHeight: '120%',
    },
    h2: {
      fontSize: 24,
      fontFamily: 'Unbounded, sans-serif',
      fontWeight: 600,
      lineHeight: '130%',
    },
    h3: {
      fontSize: 20,
      fontFamily: 'Unbounded, sans-serif',
      fontWeight: 600,
      lineHeight: '130%',
      letterSpacing: '-0.01em',
    },
    bodyLarge: {
      fontSize: 18,
      fontFamily: 'Nunito Sans, sans-serif',
      fontWeight: 400,
      lineHeight: '128%',
    },
    bodyDefault: {
      fontSize: 16,
      fontFamily: 'Nunito Sans, sans-serif',
      fontWeight: 400,
      lineHeight: '131%',
    },
    bodySmall: {
      fontSize: 14,
      fontFamily: 'Nunito Sans, sans-serif',
      fontWeight: 400,
      lineHeight: '129%',
    },
    buttonPrimary: {
      fontSize: 16,
      fontFamily: 'Unbounded, sans-serif',
      fontWeight: 600,
      lineHeight: '131.5%',
    },
    inputPlaceholder: {
      fontSize: 14,
      fontFamily: 'Nunito Sans, sans-serif',
      fontWeight: 400,
      lineHeight: '130%',
    },
    labelCaption: {
      fontSize: 12,
      fontFamily: 'Nunito Sans, sans-serif',
      fontWeight: 500,
      lineHeight: '130%',
    },
    priceHighlight: {
      fontSize: 20,
      fontFamily: 'Nunito Sans, sans-serif',
      fontWeight: 700,
      lineHeight: '130%',
    },
    tagBadge: {
      fontSize: 12,
      fontFamily: 'Nunito Sans, sans-serif',
      fontWeight: 600,
      lineHeight: '130%',
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#007a78',
      light: '#83c5be',
      dark: '#065b59',
      light2: '#edf6f9',
      50: '#edfffd',
      100: '#c2fffa',
      200: '#84fff7',
      300: '#3ffff2',
      400: '#08f9e7',
      500: '#00dccd',
      600: '#00b2aa',
      700: '#008d88',
      800: '#007a78',
      900: '#065b59',
    },
    divider: '#fff',
    success: {
      main: 'rgba(40, 167, 69, 1)',
    },
    error: {
      main: 'rgba(220, 53, 69, 1)',
    },
    info: {
      main: 'rgba(23, 162, 184, 1)',
    },
    warning: {
      main: 'rgba(255, 193, 7, 1)',
    },
    common: {
      black: '#000500',
      white: '#FFFFFF',
    },
    background: {
      default: '#fff',
    },
    action: {
      disabled: '#fff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          ...theme.typography.buttonPrimary,
          textTransform: 'none',
          lineHeight:
            ownerState.startIcon || ownerState.endIcon
              ? '24px'
              : theme.typography.buttonPrimary.lineHeight,
        }),

        containedPrimary: ({ theme }) => ({
          borderRadius: '4px',
          padding: '8px 22px',
          background: theme.palette.primary.main,
          boxShadow:
            '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
          color: theme.palette.common.white,
          '&:hover': {
            background: customPalette.light[400],
            boxShadow:
              '0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12)',
          },
          '&:focus': {
            boxShadow:
              '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12)',
            background: theme.palette.primary.dark,
          },
          '&:active': {
            boxShadow: 'none',
            background: theme.palette.primary.dark,
          },
          '&.Mui-disabled': {
            background: customPalette.gray[800],
          },
        }),
        outlinedPrimary: ({
          theme: {
            palette: { primary },
          },
        }) => ({
          borderRadius: '4px',
          padding: '7px 20px',
          background: 'transparent',
          boxShadow: 'none',
          color: primary.main,
          border: `1px solid ${primary.main}`,
          '&:hover': {
            background: customPalette.light[50],
            boxShadow:
              '0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12)',
          },
          '&:focus': {
            boxShadow:
              '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12)',
            background: customPalette.light[100],
          },
          '&:active': {
            boxShadow:
              '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12)',
            background: customPalette.light[200],
          },
          '&.Mui-disabled': {
            background: `#9cc2bd`,
            color: customPalette.gray[900],
          },
        }),
        sizeLarge: () => ({
          textTransform: 'capitalize',
        }),
        startIcon: ({}) => ({
          '& > *:first-of-type': {
            fontSize: '24px',
            width: 24,
            height: 24,
          },
        }),
      },
      defaultProps: {},
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          marginBottom: 0,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.bodyLarge,
          transition: 'all 0.3s ease-out',
          color: theme.palette.common.black,
          height: 'fit-content',
          padding: '4px',
          textUnderlineOffset: '9px',

          '&:hover': {
            color: customPalette.light[400],
            textDecoration: 'underline',
          },

          '&:active': {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
            textDecorationColor: theme.palette.primary.dark,
          },

          '&:focus-visible': {
            outline: 'none',
            textDecoration: 'underline',
            textDecorationColor: theme.palette.primary.dark,
          },
          '&:disabled': {
            color: customPalette.gray[600],
            textDecoration: 'none',
          },
        }),
      },
      variants: [
        {
          props: { variant: 'navLinkActive' },
          style: ({ theme }) => {
            const activeStyles = {
              color: theme.palette.primary.main,
              textDecoration: 'underline',
              textDecorationColor: theme.palette.primary.dark,
              cursor: 'default',
            };

            return {
              ...activeStyles,

              '&:hover': {
                ...activeStyles,
              },
              '&:active': {
                ...activeStyles,
              },
              '&:focus-visible': {
                ...activeStyles,
                outline: 'none',
              },
            };
          },
        },
      ],
    },
    MuiContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          [theme.breakpoints.up('lg')]: {
            paddingLeft: '80px',
            paddingRight: '80px',
          },
        }),
      },
    },
  },
});
