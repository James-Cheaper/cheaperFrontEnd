module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  plugins: [
    "react",
    "react-hooks",
    "jsx-a11y"
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // Possible errors
    "no-console": ["warn", { allow: ["warn", "error"] }],

    // Best practices
    eqeqeq: ["error", "always"],
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

    // React specific
    "react/prop-types": "off", // Disable prop-types as we're not using them
    "react/react-in-jsx-scope": "off", // Not needed with React 17+
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    // Accessibility
    "jsx-a11y/anchor-is-valid": "warn",
  },
};
