import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: { 
      globals: {
        ...globals.node,
        ...globals.jest,
        fetch: "readonly" 
      } 
    } 
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-undef": "off",
      "no-unused-vars": "warn"
    }
  }
];