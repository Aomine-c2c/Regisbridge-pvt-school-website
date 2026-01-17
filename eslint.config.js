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
      "no-console": process.env.NODE_ENV === 'production' ? "error" : "warn",
      "no-debugger": process.env.NODE_ENV === 'production' ? "error" : "warn",
      "no-empty": "error",
      "no-useless-escape": "error",
      "prefer-const": "error",
      "no-var": "error",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/prefer-const": "error",
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/ban-ts-comment": "error",
      "@typescript-eslint/no-unnecessary-type-constraint": "error",
      "@typescript-eslint/no-empty-object-type": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  }
);
