module.exports = [
  {
    languageOptions: {
      globals: {
        fetch: "readonly",
        console: "readonly",
        process: "readonly",
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        jest: "readonly"
      }
    },
    rules: {
      "no-undef": "off",
      "no-unused-vars": "warn"
    }
  }
];