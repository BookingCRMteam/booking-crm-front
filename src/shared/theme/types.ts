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
    h4: false;
    body1: false;
    body2: false;
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
    navLinkActive?: React.CSSProperties;
  }

  interface PaletteColor {
    light2?: string;
    white?: string;
    black?: string;
  }

  interface SimplePaletteColorOptions {
    light2?: string;
    white?: string;
    black?: string;
  }
}
