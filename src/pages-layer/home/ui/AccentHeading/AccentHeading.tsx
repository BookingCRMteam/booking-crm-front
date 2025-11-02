import type { FC } from 'react';

import { Typography } from '@mui/material';

type AccentPart = { text: string; accent?: boolean; id: number };

interface AccentHeadingProps {
  variant: 'h1' | 'h3';
  parts: AccentPart[];
  className?: string;
  maxWidth?: string;
}

export const AccentHeading: FC<AccentHeadingProps> = ({
  variant,
  parts,
  className,
  maxWidth = '330px',
}) => {
  const isHeadingH1 = variant === 'h1';
  return (
    <Typography
      variant={variant}
      component={variant}
      className={className}
      sx={{ maxWidth }}
    >
      {parts.map(({ text, accent, id }) =>
        accent ? (
          <Typography
            key={id}
            variant={variant}
            component="span"
            sx={{ color: isHeadingH1 ? 'accent.2' : 'accent.1' }}
          >
            {text}
          </Typography>
        ) : (
          <Typography key={id} variant={variant} component="span">
            {text}
          </Typography>
        ),
      )}
    </Typography>
  );
};
