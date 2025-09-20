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
  children: React.ReactNode;
  value: number;
  index: number;
}
