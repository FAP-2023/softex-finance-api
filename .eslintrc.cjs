/* eslint-env node */
module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  rules: {
    // ... outras regras ...

    // Permitir o uso do tipo 'any' em situações específicas
    "@typescript-eslint/no-explicit-any": "off"
  }
};
