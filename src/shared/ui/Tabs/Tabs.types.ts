import type { ReactNode } from 'react';

interface TabConfig {
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface OperatorTabsProps {
  tabs: TabConfig[];
  initialIndex?: number;
}

export interface CustomTabPanelProps {
  children: ReactNode;
  value: number;
  index: number;
}
