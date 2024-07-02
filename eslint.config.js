import eslintPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import parser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['node_modules/**'],
  },
  {
    files: ['src/**/*.ts'],
    plugins: {
      '@typescript-eslint': eslintPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    rules: {
      // Include rules from eslint:recommended
      ...eslintPlugin.configs['recommended'].rules,

      // Include rules from @typescript-eslint/recommended
      ...eslintPlugin.configs['recommended'].rules,

      // Include rules from prettier/recommended
      ...prettierPlugin.configs.recommended.rules,

      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
          endOfLine: 'lf',
        },
      ],
    },
  },
];