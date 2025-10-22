import '@mui/material/Typography';
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    primaryExtended: Record<number, string>;
  }
  interface PaletteOptions {
    primaryExtended?: Record<number, string>;
  }
}
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
    positive: Palette['primary'];
    focused: Palette['primary'];
    pressed: Palette['primary'];
    neutral: {
      black: string;
      darkGray: string;
      gray: string;
      white: string;
    };
    gray: Record<number, string>;
    light: Record<number | string, string>;
    accent: Record<number, string>;
  }

  interface PaletteOptions {
    positive?: PaletteOptions['primary'];
    focused?: PaletteOptions['primary'];
    pressed?: PaletteOptions['primary'];
    neutral?: {
      black: string;
      darkGray: string;
      gray: string;
      white: string;
    };
    gray?: Record<number, string>;
    light?: Record<number | string, string>;
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
