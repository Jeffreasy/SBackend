module.exports = [
  {
    ignores: ['node_modules/**'],
  },
  {
    files: ['src/**/*.ts'],
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      prettier: require('eslint-plugin-prettier'),
    },
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    rules: {
      'prettier/prettier': 'error',
      ...require('@typescript-eslint/eslint-plugin').configs.recommended.rules,
    },
  },
];
