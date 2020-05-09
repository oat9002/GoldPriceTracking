module.exports = {
    parserOptions: {
        ecmaVersion: 2017,
    },

    extends: ["eslint:recommended", "plugin:node/recommended"],
    rules: {
        semi: ["error", "always"],
        quotes: ["error", "double", { allowTemplateLiterals: true }],
    },
};
