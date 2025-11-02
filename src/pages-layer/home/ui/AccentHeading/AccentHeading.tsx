import type { FC } from 'react';

import { Typography } from '@mui/material';

type AccentPart = { text: string; accent?: boolean };

interface AccentHeadingProps {
  variant: 'h1' | 'h3';
  parts: AccentPart[];
  className?: string;
}

export const AccentHeading: FC<AccentHeadingProps> = ({
  variant,
  parts,
  className,
}) => {
  const isHeadingH1 = variant === 'h1';
  return (
    <Typography
      variant={variant}
      component={variant}
      className={className}
      sx={{ maxWidth: '330px' }}
    >
      {parts.map(({ text, accent }, index) =>
        accent ? (
          <Typography
            key={index}
            variant={variant}
            component="span"
            sx={{ color: isHeadingH1 ? 'accent.2' : 'accent.1' }}
          >
            {text}
          </Typography>
        ) : (
          <Typography key={index} variant={variant} component="span">
            {text}
          </Typography>
        ),
      )}
    </Typography>
  );
};
