module.exports = {
    parserOptions: {
        sourceType: "module",
    },
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    rules: {
        semi: ["error", "always"],
        quotes: ["error", "double", { allowTemplateLiterals: true }],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
    },
};
