import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "dist/**",
      "build/**",
      "eslint.config.mjs",
      "node_modules/**",
      ".next/**",
      ".github/**",
      ".cursor/**",
      ".vscode/**",
      ".env",
      ".env.local",
      ".env.development",
      ".env.test",
      ".env.production",
    ],
  },
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [],
          patterns: [
            {
              group: ["../*"],
              message: "Usá el alias '@/...' en lugar de rutas relativas.",
            },
          ],
        },
      ],
    },
  },
];
