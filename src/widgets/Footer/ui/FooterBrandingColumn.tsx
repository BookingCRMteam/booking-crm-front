import Image from 'next/image';

import { Box, Typography, styled } from '@mui/material';
import { EnvelopeSimpleOpenIcon } from '@phosphor-icons/react';

const StyledEmailLink = styled('a')(({ theme }) => ({
  ...theme.typography.bodySmall,
  color: theme.palette.info.main,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  gap: '4px',
  textDecoration: 'none',
  transition: 'all 0.3s ease-in-out',
  '&:hover, &:focus-visible': {
    color: theme.palette.info.light,
    textDecoration: 'underline',
    outline: 'none',
  },
  '&:active': {
    color: theme.palette.info.dark,
    textDecoration: 'none',
  },
}));

export const FooterBrandingColumn = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <Image
        src="/images/logo.png"
        width={127}
        height={44}
        alt="Booking CRM logo"
        priority
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          maxWidth: '203px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <Typography variant="bodyDefault" component="p">
            З будь-яких питань:
          </Typography>
          <StyledEmailLink href="mailto:support@pairedpaths.com">
            <EnvelopeSimpleOpenIcon size={16} />
            <Typography variant="bodySmall">support@pairedpaths.com</Typography>
          </StyledEmailLink>
        </Box>
        <Typography variant="bodySmall" component="p">
          Відповідаємо протягом 24 годин у робочі дні
        </Typography>
      </Box>

      <Typography variant="labelCaption" component="p">
        © 2025 Paired Paths. Всі права захищено.
      </Typography>
    </Box>
  );
};
