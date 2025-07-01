// eslint.config.js
const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "no-console": ["off"],
      "no-debugger": ["error"],
      "no-unused-vars": ["off"],
      eqeqeq: ["error", "always"],
      semi: ["off"],
      quotes: ["off"],
    },
  },
];
