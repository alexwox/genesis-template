import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypeScript,

  // ── strict type-checked rules ──────────────────────────────────────
  // eslint-config-next/typescript already registers the parser and
  // @typescript-eslint plugin with `recommended` rules. We layer the
  // strict + stylistic + type-aware rules on top without re-registering
  // the plugin (which would cause a "Cannot redefine plugin" error).
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.mjs"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // ── promoted from warn to error ──
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-unused-expressions": "error",

      // ── ban `any` ──
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unsafe-argument": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-return": "error",

      // ── strict rules (from strictTypeChecked) ──
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/no-unnecessary-type-parameters": "error",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
      "@typescript-eslint/no-unnecessary-template-expression": "error",
      "@typescript-eslint/no-confusing-void-expression": [
        "error",
        { ignoreArrowShorthand: true },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/return-await": ["error", "in-try-catch"],
      "@typescript-eslint/no-dynamic-delete": "error",
      "@typescript-eslint/no-invalid-void-type": "error",
      "@typescript-eslint/prefer-promise-reject-errors": "error",
      "@typescript-eslint/restrict-plus-operands": "error",
      "@typescript-eslint/restrict-template-expressions": "error",
      "@typescript-eslint/unified-signatures": "error",
      "@typescript-eslint/use-unknown-in-catch-callback-variable": "error",
      "@typescript-eslint/unbound-method": "error",

      // ── stylistic type-checked rules ──
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/dot-notation": "error",
      "@typescript-eslint/prefer-includes": "error",
      "@typescript-eslint/prefer-string-starts-ends-with": "error",
      "@typescript-eslint/prefer-find": "error",
      "@typescript-eslint/non-nullable-type-assertion-style": "error",

      // ── file and function size limits ──
      "max-lines": [
        "error",
        { max: 300, skipBlankLines: true, skipComments: true },
      ],
      "max-lines-per-function": [
        "error",
        { max: 80, skipBlankLines: true, skipComments: true },
      ],

      // ── nudge toward structured logger ──
      "no-console": "warn",
    },
  },

  // ── overrides: shadcn generated UI ──
  {
    files: ["components/ui/**"],
    rules: {
      "max-lines": "off",
      "max-lines-per-function": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
    },
  },

  // ── overrides: schema files (tables + relations are naturally long) ──
  {
    files: ["lib/db/schema/**"],
    rules: {
      "max-lines": "off",
    },
  },

  // ── overrides: standalone config files (not in tsconfig program) ──
  {
    files: [
      "drizzle.config.ts",
      "eslint.config.mjs",
      "postcss.config.mjs",
      "next.config.ts",
    ],
    rules: {
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/await-thenable": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/return-await": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/prefer-optional-chain": "off",
      "@typescript-eslint/prefer-includes": "off",
      "@typescript-eslint/prefer-string-starts-ends-with": "off",
      "@typescript-eslint/prefer-find": "off",
      "@typescript-eslint/prefer-promise-reject-errors": "off",
      "@typescript-eslint/non-nullable-type-assertion-style": "off",
      "@typescript-eslint/use-unknown-in-catch-callback-variable": "off",
    },
  },
];

export default eslintConfig;
