module.exports = {
  root: true, // Zorgt ervoor dat ESLint stopt met zoeken naar configuratiebestanden in bovenliggende mappen.
  parser: '@typescript-eslint/parser', // Specifieke parser voor TypeScript-code.
  parserOptions: {
    project: ['./tsconfig.json'], // Maakt gebruik van je TypeScript configuratie.
    tsconfigRootDir: __dirname, // Specificeert de root directory van je TypeScript-project.
    ecmaVersion: 2021,        // Stel in op de nieuwste ECMAScript-versie die je gebruikt.
    sourceType: 'module',     // Laat het gebruik van import/export syntax toe.
  },
  plugins: ['@typescript-eslint', 'prettier'], // Plugins voor TypeScript-specifieke regels en Prettier.
  extends: [
    'eslint:recommended',           // Aanbevolen ESLint regels.
    'plugin:@typescript-eslint/recommended', // Aanbevolen TypeScript-ESLint regels.
    'plugin:prettier/recommended',    // Integreert Prettier in ESLint.
  ],
  rules: {
    'prettier/prettier': 'error',    // Fouten rapporteren voor Prettier opmaakproblemen.
    '@typescript-eslint/no-explicit-any': 'error', // Verbiedt het gebruik van 'any'.
    '@typescript-eslint/no-unused-vars': 'error', // Verbiedt ongebruikte variabelen.
    '@typescript-eslint/ban-ts-comment': 'warn',  // Waarschuwt voor het gebruik van @ts-ignore en @ts-nocheck.
    '@typescript-eslint/no-var-requires': 'off', // Schakelt de regel uit die het gebruik van require() verbiedt (nodig voor CommonJS modules).
    // Voeg hier eventueel andere regels toe naar je eigen voorkeuren.
  },
  ignorePatterns: ['**/*.js'], // Negeer alle JavaScript-bestanden om conflicten te voorkomen
};
