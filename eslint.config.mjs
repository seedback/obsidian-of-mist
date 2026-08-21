import pluginVue from 'eslint-plugin-vue';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importAlias from '@dword-design/eslint-plugin-import-alias';

const namingConventionRule = [
  'error',

  // top-level true constants may be SCREAMING_SNAKE_CASE
  {
    selector: 'variable',
    modifiers: ['const', 'global'],
    format: ['camelCase', 'snake_case', 'UPPER_CASE'],
  },

  // data (variables, parameters, object/class properties):
  // snake_case or camelCase
  {
    selector: ['variable', 'parameter', 'property'],
    format: ['camelCase', 'snake_case'],
    leadingUnderscore: 'allow',
  },

  // quoted keys like CSS class names aren't code identifiers
  {
    selector: 'objectLiteralProperty',
    modifiers: ['requiresQuotes'],
    format: null,
  },

  // object literal functions can also be snake_case
  {
    selector: 'objectLiteralMethod',
    format: ['camelCase', 'snake_case'],
  },

  // functions and methods: camelCase only
  {
    selector: ['function', 'method'],
    format: ['camelCase'],
  },
];

const aliasRule = [
  'error',
  {
    alias: {
      '@': './src',
      '@src': './src',
      '@styles': './src/styles',
      '@root': './',
      '@model': './src/model',
      '@utils': './src/utils',
      '@components': './src/components',
      '@schemas': './src/schemas',
    },
    aliasForSubpaths: true,
    shouldReadTsConfig: false,
  },
];

export default [
  {
    ignores: ['main.js', 'node_modules/**', 'version-bump.mjs'],
  },

  ...pluginVue.configs['flat/recommended'],

  // Register import-alias correctly, but only for source files.
  {
    ...importAlias.configs.recommended,
    files: ['src/**/*.{ts,vue}'],
    rules: {
      ...importAlias.configs.recommended.rules,
      '@dword-design/import-alias/prefer-alias': aliasRule,
    },
  },

  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/naming-convention': namingConventionRule,
    },
  },

  {
    files: ['src/**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'vue/component-name-in-template-casing': ['error', 'kebab-case'],
      'vue/prop-name-casing': ['error', 'snake_case'],
      '@typescript-eslint/naming-convention': namingConventionRule,
    },
  },
];