import { StateCreator } from 'zustand';

export type NotificationSeverity = 'success' | 'error' | 'warning' | 'info';

export interface NotificationState {
  open: boolean;
  message: string;
  severity: NotificationSeverity;
  autoHideDuration: number;
  showNotification: (
    message: string,
    severity: NotificationSeverity,
    autoHideDuration?: number,
  ) => void;
  hideNotification: () => void;
}

export const createNotificationState: StateCreator<
  NotificationState,
  [['zustand/devtools', never]],
  [],
  NotificationState
> = (set) => ({
  open: false,
  message: '',
  severity: 'info',
  autoHideDuration: 6000,
  showNotification: (message, severity, autoHideDuration = 6000) =>
    set(
      {
        open: true,
        message,
        severity,
        autoHideDuration,
      },
      false,
      'notification/showNotification',
    ),
  hideNotification: () =>
    set({ open: false }, false, 'notification/hideNotification'),
});
