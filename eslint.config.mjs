// import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import storybook from 'eslint-plugin-storybook';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  // ...nextVitals,
  ...nextTs,
  ...storybook.configs['flat/recommended'],
  prettier,
  globalIgnores([
    'node_modules/',
    'dist/',
    'coverage/',
    'storybook/',
    'build/',
    '.next/',
    'out/',
    '*.d.ts',
    '!.storybook',
  ]),
]);

export default eslintConfig;
