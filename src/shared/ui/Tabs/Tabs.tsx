'use client';

import { type FC, type SyntheticEvent, useState } from 'react';

import { Box, Tab, Tabs as TabsMUI } from '@mui/material';

import type { CustomTabPanelProps, OperatorTabsProps } from './Tabs.types';

const CustomTabPanel: FC<CustomTabPanelProps> = ({
  children,
  value,
  index,
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export const Tabs: FC<OperatorTabsProps> = ({ tabs, initialIndex = 0 }) => {
  const [value, setValue] = useState(initialIndex);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabsMUI value={value} onChange={handleChange} variant="fullWidth">
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} disabled={tab.disabled} />
          ))}
        </TabsMUI>
      </Box>
      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
};
