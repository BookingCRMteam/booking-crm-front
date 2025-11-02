'use client';

import { Box, type BoxProps, Container, Grid, styled } from '@mui/material';

import { FooterBrandingColumn } from './ui/FooterBrandingColumn';
import { FooterNavigationColumn } from './ui/FooterNavigationColumn';
import { FooterOperatorColumn } from './ui/FooterOperatorColumn';

const StyledFooterWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

const StyledFooterContainer = styled(Container)({
  padding: '40px 0',
  display: 'flex',
  justifyContent: 'center',
});

export const Footer = () => {
  return (
    <StyledFooterWrapper component="footer">
      <StyledFooterContainer maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 3 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <FooterBrandingColumn />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FooterNavigationColumn />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FooterOperatorColumn />
          </Grid>
        </Grid>
      </StyledFooterContainer>
    </StyledFooterWrapper>
  );
};
