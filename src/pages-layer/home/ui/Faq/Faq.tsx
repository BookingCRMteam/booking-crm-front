'use client';

import { Container, type ContainerProps, styled } from '@mui/material';

import { AccentHeading } from '../AccentHeading/AccentHeading';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { FaqAccordionList } from './FaqAccordionList';
import { ACCORDION_ITEMS, FAQ_DESCRIPTION, FAQ_TITLE_PARTS } from './constants';

const ContentWrapper = styled(Container)<ContainerProps>({
  padding: '60px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '48px',
});

export const Faq = () => {
  return (
    <ContentWrapper maxWidth="lg" component="section">
      <SectionTitle description={FAQ_DESCRIPTION}>
        <AccentHeading variant="h3" parts={FAQ_TITLE_PARTS} />
      </SectionTitle>
      <FaqAccordionList accordionItems={ACCORDION_ITEMS} />
    </ContentWrapper>
  );
};
