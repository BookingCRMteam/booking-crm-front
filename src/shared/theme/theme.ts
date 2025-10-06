'use client';

import { Inter, Nunito_Sans, Roboto, Unbounded } from 'next/font/google';

import { createTheme } from '@mui/material';

import { customPalette } from './customColors';

const iconSizes = {
  small: 18,
  medium: 20,
  large: 24,
};

const iconMargin = {
  small: 2,
  medium: 2,
  large: 9.5,
};

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
  palette: {
    mode: 'light',
    secondary: {
      main: customPalette.primary.light2,
    },
    primary: customPalette.primary,
    primaryExtended: customPalette.primary, // для числових значень
    neutral: customPalette.neutral,
    gray: customPalette.gray,
    light: customPalette.light,
    accent: customPalette.accent,
    text: {
      primary: customPalette.base.black,
    },
    common: {
      black: customPalette.base.black,
      white: customPalette.base.white,
    },
    success: {
      main: customPalette.status.success,
    },
    error: {
      main: customPalette.status.error,
    },
    warning: {
      main: customPalette.status.warning,
    },
    info: {
      main: customPalette.status.info,
    },
    positive: {
      main: customPalette.status.positive,
    },
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
      fontFamily: unbounded.style.fontFamily,
      fontWeight: 700,
      lineHeight: '120%',
    },
    h2: {
      fontSize: 24,
      fontFamily: unbounded.style.fontFamily,
      fontWeight: 600,
      lineHeight: '130%',
    },
    h3: {
      fontSize: 20,
      fontFamily: unbounded.style.fontFamily,
      fontWeight: 600,
      lineHeight: '130%',
      letterSpacing: '-0.01em',
    },
    bodyLarge: {
      fontSize: 18,
      fontFamily: nunitoSans.style.fontFamily,
      fontWeight: 400,
      lineHeight: '128%',
    },
    bodyDefault: {
      fontSize: 16,
      fontFamily: nunitoSans.style.fontFamily,
      fontWeight: 400,
      lineHeight: '131%',
    },
    bodySmall: {
      fontSize: 14,
      fontFamily: nunitoSans.style.fontFamily,
      fontWeight: 400,
      lineHeight: '129%',
    },
    buttonPrimary: {
      fontSize: 16,
      fontFamily: unbounded.style.fontFamily,
      fontWeight: 600,
      lineHeight: '131.5%',
    },
    inputPlaceholder: {
      fontSize: 14,
      fontFamily: nunitoSans.style.fontFamily,
      fontWeight: 400,
      lineHeight: '130%',
    },
    labelCaption: {
      fontSize: 12,
      fontFamily: nunitoSans.style.fontFamily,
      fontWeight: 500,
      lineHeight: '130%',
    },
    priceHighlight: {
      fontSize: 20,
      fontFamily: nunitoSans.style.fontFamily,
      fontWeight: 700,
      lineHeight: '130%',
    },
    tagBadge: {
      fontSize: 12,
      fontFamily: nunitoSans.style.fontFamily,
      fontWeight: 600,
      lineHeight: '130%',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          fontFamily: inter.style.fontFamily,
          fontWeight: '500',
          fontSize: '14px',
          letterSpacing: '0.01em',
          textTransform: 'uppercase',
          height: 'fit-content',
          lineHeight:
            ownerState.startIcon || ownerState.endIcon ? '24px' : '1.42857',
        }),
        containedPrimary: ({ theme }) => ({
          borderRadius: '4px',
          padding: '8px 22px',
          background: theme.palette.primary.main,
          boxShadow:
            '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
          color: theme.palette.common.white,
          '&:hover': {
            background: theme.palette.light[400],
            boxShadow:
              '0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12)',
          },
          '&:focus-visible': {
            boxShadow:
              '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12)',
            background: theme.palette.primary.dark,
          },
          '&:active': {
            boxShadow: 'none',
            background: theme.palette.primary.dark,
          },
          '&.Mui-disabled': {
            background: theme.palette.gray[800],
          },
        }),
        outlinedSecondary: ({ theme: { palette } }) => ({
          borderRadius: '4px',
          padding: '7px 20px',
          background: 'transparent',
          boxShadow: 'none',
          color: palette.primary.main,
          border: `1px solid ${palette.primary.main}`,
          '&:hover': {
            background: palette.light[50],
            boxShadow:
              '0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12)',
          },
          '&:focus-visible': {
            boxShadow:
              '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12)',
            background: palette.light[100],
          },
          '&:active': {
            boxShadow:
              '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12)',
            background: palette.light[200],
          },
          '&.Mui-disabled': {
            background: `#9cc2bd`,
            color: palette.gray[900],
          },
        }),
        sizeLarge: ({ theme }) => ({
          ...theme.typography.buttonPrimary,
          textTransform: 'none',
        }),
        sizeMedium: {
          padding: '6px 15px',
        },
        sizeSmall: {
          padding: '6px 10px',
          lineHeight: '20px',
        },
        startIcon: ({ ownerState }) => {
          const size = iconSizes[ownerState.size ?? 'medium'];
          const marginRight = iconMargin[ownerState.size ?? 'medium'];
          return {
            marginRight,
            '& > *:first-of-type': {
              fontSize: `${size}px`,
              width: size,
              height: size,
            },
          };
        },

        endIcon: ({ ownerState }) => {
          const size = iconSizes[ownerState.size ?? 'medium'];
          const marginLeft = iconMargin[ownerState.size ?? 'medium'];
          return {
            marginLeft,
            '& > *:first-of-type': {
              fontSize: `${size}px`,
              width: size,
              height: size,
            },
          };
        },
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
    MuiBreadcrumbs: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.labelCaption,
          alignItems: 'center',
          padding: '12px 0',
        }),
        li: {},
        separator: {
          marginLeft: '4px',
          marginRight: '4px',
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
    MuiLink: {
      styleOverrides: {},
      variants: [
        {
          props: { variant: 'navLink' },
          style: ({ theme }) => {
            return {
              ...theme.typography.bodyLarge,
              transition: 'all 0.3s ease-out',
              color: theme.palette.common.black,
              height: 'fit-content',
              padding: '4px',
              textUnderlineOffset: '9px',

              '&:hover': {
                color: theme.palette.light[400],
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
                color: theme.palette.gray[600],
                textDecoration: 'none',
              },
            };
          },
        },
        {
          props: { variant: 'navLinkActive' },
          style: ({ theme }) => {
            const activeStyles = {
              ...theme.typography.bodyLarge,
              transition: 'all 0.3s ease-out',
              height: 'fit-content',
              padding: '4px',
              textUnderlineOffset: '9px',
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
        {
          props: { variant: 'link' },
          style: ({ theme }) => {
            return {
              ...theme.typography.bodySmall,
              color: theme.palette.info.main,
              textDecoration: 'none',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
                textDecorationSkipInk: 'none',
                color: '#34c8dc',
              },
              '&:active': {
                color: '#1789A3',
                textDecoration: 'none',
              },
              '&:focus-visible': {
                textDecoration: 'underline',
                textDecorationSkipInk: 'none',
                color: '#34c8dc',
                outline: 'none',
              },
            };
          },
        },
        {
          props: { variant: 'breadcrumbLink' },
          style: ({ theme }) => ({
            ...theme.typography.labelCaption,
            color: theme.palette.gray[900],
            textDecoration: 'none',

            '&:hover': {
              color: theme.palette.text.primary,
              textDecoration: 'none',
            },
            '&:focus-visible': {
              color: theme.palette.text.primary,
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              outline: 'none',
            },
            '&:active': {
              color: theme.palette.primary.dark,
              textDecoration: 'none',
            },
          }),
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
    MuiCheckbox: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(1),
          color: theme.palette.common.black,
          '&:hover': {
            background: 'rgba(0, 104, 74, 0.08)',
          },
          '&:focus-visible': {
            background: 'rgba(0, 104, 74, 0.1)',
          },
          '&:active': {
            background: theme.palette.light[300],
          },
          '&.Mui-disabled': {
            color: theme.palette.grey[500],
          },
        }),
      },
    },
  },
});
