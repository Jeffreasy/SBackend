const { Linter } = require("eslint");

module.exports = [
  {
    ignores: ["node_modules/**"],
  },
  {
    files: ["src/**/*.ts"],
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      prettier: require("eslint-plugin-prettier"),
    },
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          trailingComma: "all",
          endOfLine: "lf",
        },
      ],
      ...require("eslint-plugin-prettier").configs.recommended.rules,
      ...require("@typescript-eslint/eslint-plugin").configs.recommended.rules,
    },
  },
];
