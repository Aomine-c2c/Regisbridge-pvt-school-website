import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

// ESLint flat config for Next.js with TypeScript
export default tseslint.config(
  {
    ignores: [
      "dist/**",
      ".next/**",
      "node_modules/**",
      "coverage/**",
      "public/**",
      "*.config.js",
      "*.config.ts",
      "*.config.mjs",
      "**/__tests__/**",
      "**/*.test.ts",
      "**/*.test.tsx",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // Only errors fail the build, warnings are informative
      "no-console": "off", // Allow console in development
      "no-empty": "error",
      "no-useless-escape": "error",
      "@typescript-eslint/no-unused-vars": "off", // Too noisy during development
      "@typescript-eslint/no-explicit-any": "off", // Allow any for flexibility
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/ban-ts-comment": "error",
      "@typescript-eslint/no-unnecessary-type-constraint": "error",
      "@typescript-eslint/no-empty-object-type": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "off", // Can be noisy
    },
  }
);
