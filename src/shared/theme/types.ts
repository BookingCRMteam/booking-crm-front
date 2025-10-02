import '@mui/material/Typography';
import '@mui/material/styles';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    bodySmall: true;
    bodyDefault: true;
    bodyLarge: true;
    buttonPrimary: true;
    inputPlaceholder: true;
    labelCaption: true;
    priceHighlight: true;
    tagBadge: true;
    navLink: true;
    navLinkActive: true;
    link: true;
    breadcrumbLink: true;
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    bodySmall: React.CSSProperties;
    bodyDefault: React.CSSProperties;
    bodyLarge: React.CSSProperties;
    buttonPrimary: React.CSSProperties;
    inputPlaceholder: React.CSSProperties;
    labelCaption: React.CSSProperties;
    priceHighlight: React.CSSProperties;
    tagBadge: React.CSSProperties;
    navLink: React.CSSProperties;
    navLinkActive: React.CSSProperties;
    link: React.CSSProperties;
    breadcrumbLink: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    bodySmall?: React.CSSProperties;
    bodyDefault?: React.CSSProperties;
    bodyLarge?: React.CSSProperties;
    buttonPrimary?: React.CSSProperties;
    inputPlaceholder?: React.CSSProperties;
    labelCaption?: React.CSSProperties;
    priceHighlight?: React.CSSProperties;
    tagBadge?: React.CSSProperties;
    navLink?: React.CSSProperties;
    Link?: React.CSSProperties;
  }

  interface Palette {
    neutral: {
      black: string;
      darkGray: string;
      gray: string;
      white: string;
    };
    gray: Record<number, string>;
    light: Record<number | string, string>;
    status: {
      success: string;
      positive: string;
      warning: string;
      error: string;
      info: string;
    };
    accent: Record<number, string>;
  }

  interface PaletteOptions {
    neutral?: {
      black: string;
      darkGray: string;
      gray: string;
      white: string;
    };
    gray?: Record<number, string>;
    light?: Record<number | string, string>;
    status?: {
      success: string;
      positive: string;
      warning: string;
      error: string;
      info: string;
    };
    accent?: Record<number, string>;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
    gray: true;
    light: true;
    status: true;
    accent: true;
  }
}
