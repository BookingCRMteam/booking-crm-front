'use client';

import { type FC, useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  accordionSummaryClasses,
  styled,
} from '@mui/material';
import { CaretUpIcon } from '@phosphor-icons/react';

const StyledAccordion = styled(Accordion)(() => ({
  padding: 0,
  margin: 0,
  '&::before': {
    display: 'none',
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: '15.6px 12px',
  backgroundColor: theme.palette.gray[50],
  borderBottom: '1px solid transparent',
  '&:hover, &:focus-visible': {
    backgroundColor: theme.palette.gray[50],

    [`& .${accordionSummaryClasses.content}, & .${accordionSummaryClasses.expandIconWrapper}`]:
      {
        color: theme.palette.primary.main,
      },
  },
  '&:focus-visible': {
    borderBottomColor: theme.palette.gray[800],
  },
  [`& .${accordionSummaryClasses.expandIconWrapper}`]: {
    color: theme.palette.common.black,
    transform: 'rotate(180deg)',
  },
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: 'rotate(0deg)',
    },

  [`& .${accordionSummaryClasses.content}`]: {
    margin: 0,
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

type AccordionItem = {
  id: number;
  title: string;
  description: string;
};

type FaqAccordionListProps = {
  accordionItems: AccordionItem[];
};
export const FaqAccordionList: FC<FaqAccordionListProps> = ({
  accordionItems,
}) => {
  const [expandedId, setExpandedId] = useState<number | false>(false);

  const handleAccordionToggle =
    (panelId: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedId(isExpanded ? panelId : false);
    };

  return (
    <Box
      maxWidth={686}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {accordionItems.map((item) => (
        <StyledAccordion
          disableGutters
          elevation={0}
          square
          key={item.id}
          expanded={expandedId === item.id}
          onChange={handleAccordionToggle(item.id)}
        >
          <StyledAccordionSummary
            aria-controls={`panel-${item.id}-content`}
            id={`panel-${item.id}-header`}
            expandIcon={<CaretUpIcon size={24} />}
          >
            <Typography component="p" variant="priceHighlight">
              {item.title}
            </Typography>
          </StyledAccordionSummary>

          <StyledAccordionDetails>
            <Typography component="p" variant="bodyLarge">
              {item.description}
            </Typography>
          </StyledAccordionDetails>
        </StyledAccordion>
      ))}
    </Box>
  );
};
