import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    rules: {
      // This admin panel is a client-rendered SPA behind cookie-session
      // auth (unlike apps/web, which fetches server-side and has zero
      // occurrences of this pattern) — every list/detail page necessarily
      // fetches from the API inside a `useEffect(() => { load() }, [])` on
      // mount. That's the correct, intentional pattern for this
      // architecture, not an accidental cascading-render bug; this rule
      // assumes a React Compiler-oriented codebase that doesn't apply here.
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
