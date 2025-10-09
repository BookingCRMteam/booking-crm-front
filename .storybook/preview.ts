import { CssBaseline, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import type { Preview } from '@storybook/nextjs';
import {
  ReadonlyURLSearchParams,
  getRouter,
  usePathname,
  useSearchParams,
} from '@storybook/nextjs/navigation.mock';
import mockRouter from 'next-router-mock';

import { theme } from '../src/shared/theme';
import './storybook-styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    beforeEach: () => {
      getRouter().push.mockImplementation(
        (...args: Parameters<typeof mockRouter.push>) =>
          mockRouter.push(...args),
      );
      getRouter().replace.mockImplementation(
        (...args: Parameters<typeof mockRouter.replace>) =>
          mockRouter.replace(...args),
      );
      usePathname.mockImplementation(() => mockRouter.pathname);
      useSearchParams.mockImplementation(() => {
        return new ReadonlyURLSearchParams(
          new URLSearchParams(mockRouter.query as Record<string, string>),
        );
      });
    },
  },

  decorators: [
    withThemeFromJSXProvider({
      GlobalStyles: CssBaseline,
      Provider: ThemeProvider,
      themes: {
        light: theme,
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
