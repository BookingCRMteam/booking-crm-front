// import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  // ...nextVitals,
  ...nextTs,
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
  ]),
]);

export default eslintConfig;
